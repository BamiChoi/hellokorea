import RecentActivity from "Components/profile/RecentActivity";
import Info from "Components/profile/Info";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useUser } from "libs/useUser";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const { isLoading, data, errorMessage } = useUser(userId!);
  const user = data?.data.user;
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text={`${user?.nickname}의 프로필`} />
        {user ? (
          <>
            <Info profile={user} />
            <RecentActivity
              nickname={user.nickname}
              activities={data?.data.activities}
            />
          </>
        ) : null}
      </main>
    </Wrapper>
  );
}

export default UserProfile;
