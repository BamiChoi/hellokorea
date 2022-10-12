import { IMessage } from "Routes/Message/Chatroom";
import { IOwner } from "Routes/Post/Post";

interface IChatProps {
  chat: {
    speakers: IOwner[];
    messages: IMessage[];
  };
}

function Chat({ chat }: IChatProps) {
  return (
    <li className="border-2 rounded-r-3xl rounded-t border-main space-y-2 flex justify-evenly shadow-lg">
      <div className="w-full">
        <div className="bg-main border-main flex justify-between p-2">
          <div className="bg-white px-2 rounded-lg">상대</div>
          <div className="bg-white px-2 rounded-lg space-x-2">
            <button>삭제</button>
            <button>신고</button>
            <button>차단</button>
          </div>
        </div>
        <div className="p-2 flex justify-between w-full">
          <span>최종메세지</span>
          <time>2022-10-09 10:57</time>
        </div>
      </div>
    </li>
  );
}

export default Chat;
