import { Link } from "react-router-dom";

interface ProfileMenuProps {
  text: string;
  url: string;
  children: React.ReactNode;
}

function ProfileMenu({ text, url, children }: ProfileMenuProps) {
  return (
    <Link to={url}>
      <div className="bg-main rounded-full w-24 h-24 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-powermain">
        {children}
        {text}
      </div>
    </Link>
  );
}

export default ProfileMenu;
