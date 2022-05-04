import { useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Activity from "Components/profile/Activity";
import Nav from "Components/profile/Nav";
import { getProfile } from "api/userApi";
import { useQuery } from "react-query";
import Info from "Components/profile/Info";
import { IComment, IPost } from "Routes/Post/Post";

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
  const { isLoading, data, isError, error } = useQuery<IProfileResponse>(
    [user.id, "getProfile"],
    () => getProfile(user.id),
    {
      retry: false,
    }
  );
  // ToDo: Error Handling
  const profile = data?.data.user;
  return (
    <Wrapper>
      {profile ? (
        <main className="w-full flex flex-col items-center justify-center px-10">
          <Title text="My page" />
          <Info profile={profile} />
          <section>
            <Nav />
            <Activity
              nickname={user.nickname}
              activities={data?.data.activities}
            />
          </section>
        </main>
      ) : null}
    </Wrapper>
  );
}

export default Profile;
