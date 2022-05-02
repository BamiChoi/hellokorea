import { useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Activities from "Components/user/Activities";
import RecentActivity from "Components/user/RecentActivity";
import ProfileMenuNav from "Components/user/ProfileMenuNav";
import { getProfile } from "api/userApi";
import { useQuery } from "react-query";
import ProfileCard from "Components/user/ProfileCard";

export interface IProfileResponse {
  data: {
    status: string;
    user: IUser;
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
          <ProfileCard profile={profile} />
          <section>
            <Activities />
            <ProfileMenuNav />
            <RecentActivity nickname={user.nickname} />
          </section>
        </main>
      ) : null}
    </Wrapper>
  );
}

export default Profile;
