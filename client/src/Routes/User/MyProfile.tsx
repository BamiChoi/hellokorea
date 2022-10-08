import { useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/user";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Nav from "Components/profile/Nav";
import Info from "Components/profile/Info";
import { IComment, IPost } from "Routes/Post/Post";
import { useUser } from "libs/useUser";
import ErrorMsg from "Components/ErrorMsg";
import RecentActivity from "Components/profile/RecentActivity";

export interface IActivities {
  recentPosts: IPost[];
  recentComments: IComment[];
}

export interface IProfileResponse {
  data: {
    status: string;
    user: IUser;
    activities: IActivities;
  };
}

function MyProfile() {
  const user = useSelector(loggedInUser);
  const { isLoading, data, errorMessage } = useUser(user._id);
  const profile = data?.data.user;
  console.log(profile);
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text="My page" />
        {profile ? (
          <>
            <Info profile={profile} />
            <section>
              <Nav />
              <RecentActivity
                nickname={user.nickname}
                activities={data?.data.activities}
              />
            </section>
          </>
        ) : errorMessage ? (
          <ErrorMsg text={errorMessage} />
        ) : null}
      </main>
    </Wrapper>
  );
}

export default MyProfile;
