import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggedInUser } from "reducers/user";
import { IOwner } from "Routes/Post/Post";

interface IUsernameProps {
  user: IOwner;
  size: "sm" | "md" | "lg";
}

function Username({ user, size }: IUsernameProps) {
  const sizeStyle = {
    avatar: "w-12 h-12",
    name: "text-lg",
  };
  if (size === "sm") {
    sizeStyle.avatar = "w-6 h-6";
    sizeStyle.name = "text-sm";
  } else if (size === "md") {
    sizeStyle.avatar = "w-8 h-8";
    sizeStyle.name = "text-md";
  }
  const avatarSize = sizeStyle.avatar;
  const textSize = sizeStyle.name;
  const authenticatedUser = useSelector(loggedInUser);
  return (
    <Link
      to={user._id === authenticatedUser._id ? `/user` : `/user/${user._id}`}
    >
      <div className="flex overflow-hidden items-center">
        <img
          alt="owner_avatar"
          src={"/" + user.avatar}
          className={`bg-white rounded-full mr-2 ${avatarSize}`}
        />
        <span className={`overflow-hidden text-ellipsis ${textSize}`}>
          {user.nickname}
        </span>
      </div>
    </Link>
  );
}

export default Username;
