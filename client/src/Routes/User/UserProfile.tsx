import RecentActivity from "Components/profile/RecentActivity";
import Info from "Components/profile/Info";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useUser } from "libs/useUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createChat } from "api/chatApi";

interface ICreateChatResponse {
  data: {
    state: string;
    chatRoomId: string;
  };
}

function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isLoading, data, errorMessage } = useUser(userId!);
  const user = data?.data.user;
  const { isLoading: isMutateLoading, mutate } = useMutation(
    () => createChat(),
    {
      onSuccess: (data: ICreateChatResponse) => {
        const chatRoomId = data.data.chatRoomId;
        navigate(`/message/${chatRoomId}`, { state: user });
      },
    }
  );
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text={`${user?.nickname}의 프로필`} />
        {user ? (
          <>
            <Info profile={user} />
            <button
              onClick={() => mutate()}
              className="bg-main py-2 px-4 text-white rounded-md mb-5 hover:bg-powermain"
            >
              1:1 메세지 보내기
            </button>
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
