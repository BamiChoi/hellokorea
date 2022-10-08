import RecentActivity from "Components/profile/RecentActivity";
import Info from "Components/profile/Info";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useUser } from "libs/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/user";

function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isLoading, data, errorMessage } = useUser(userId!);
  console.log(data);
  const user = data?.data.user;
  const currentUser = useSelector(loggedInUser);
  console.log(currentUser._id, user?._id);
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text={`${user?.nickname}의 프로필`} />
        {user && currentUser._id !== user._id ? (
          <>
            <Info profile={user} />
            <RecentActivity
              nickname={user.nickname}
              activities={data?.data.activities}
            />
          </>
        ) : user && currentUser._id === user._id ? (
          navigate("/user")
        ) : null}
      </main>
    </Wrapper>
  );
}

export default UserProfile;
