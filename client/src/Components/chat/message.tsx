import { addClassnames } from "libs/utils";

function Message() {
  return (
    <li
      className={addClassnames(
        "w-flex flex"
        // message.from._id !== toUser._id ? "justify-end" : "justify-start"
      )}
    >
      <div className="mb-3">
        {/* {message.from.nickname} */}
        <div className="p-2 border-main border-2 rounded-md">
          {/* {message.message} */}
        </div>
      </div>
    </li>
  );
}

export default Message;
