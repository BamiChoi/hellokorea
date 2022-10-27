import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { IChat, useChats } from "libs/useChats";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUser } from "reducers/user";
import { IOwner } from "Routes/Post/Post";


function Chats() {
  const navigate = useNavigate();
  const userId = useSelector(loggedInUser)._id;
  const { isLoading, data } = useChats(userId);
  const chats = data?.data.chats;
  const getToUser = (users: IOwner[]) => {
    const toUserArray = users.filter((user) => user._id !== userId);
    return toUserArray.pop();
  };
  const onClickChat = (chat: any) => {
    navigate(`/chat/${chat._id}`, { state: getToUser(chat.users) });
  };
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text="메세지" />
        <ul className="w-full space-y-8">
          {chats
            ? chats.map((chat: IChat) => (
                <li
                  onClick={() => onClickChat(chat)}
                  key={chat._id}
                  className="border-2 rounded-r-3xl rounded-t border-main space-y-2 flex justify-evenly shadow-lg cursor-pointer"
                >
                  <div className="w-full">
                    <div className="bg-main border-main flex justify-between p-2">
                      <div className="bg-white px-2 rounded-lg">
                        {getToUser(chat.users)?.nickname}
                      </div>
                      <div className="bg-white px-2 rounded-lg space-x-2">
                        <button>삭제</button>
                        <button>신고</button>
                        <button>차단</button>
                      </div>
                    </div>
                    <div className="p-2 flex justify-between w-full">
                      <span>{chat.messages.pop()?._id}</span>
                      <time>2022-10-09 10:57</time>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </main>
    </Wrapper>
  );
}

export default Chats;
