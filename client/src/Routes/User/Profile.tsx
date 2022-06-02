import { useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/user";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Activity from "Components/profile/Activity";
import Nav from "Components/profile/Nav";
import Info from "Components/profile/Info";
import { IComment, IPost } from "Routes/Post/Post";
import { useUser } from "libs/useUser";
import ErrorMsg from "Components/ErrorMsg";

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

function Profile() {
  const user = useSelector(loggedInUser);
  const { isLoading, data, errorMessage } = useUser(user.id);
  const profile = data?.data.user;
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text="My page" />
        {profile ? (
          <>
            <Info profile={profile} />
            <section>
              <Nav />
              <Activity
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

export default Profile;
