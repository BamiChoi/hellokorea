import { IUser } from "reducers/user";

interface IInfoProps {
  profile: IUser;
}

function Info({ profile }: IInfoProps) {
  return (
    <div className="w-full mx-10 rounded-xl bg-cream flex flex-col justify-start items-center py-5 mb-5">
      <div className="w-full flex justify-end">
        <div className="flex mr-5">
          <svg
            className="w-6 h-6 text-warning"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
          300 follwers
        </div>
      </div>
      <div className="flex justify-start items-center w-full ml-20">
        <img
          alt="avatar"
          src={"/" + profile.avatar}
          className="bg-white w-32 h-32 rounded-full mb-4 object-cover
          "
        />
        <div className="flex flex-col ml-14 space-y-4">
          <span>{profile.nickname}</span>
          <span>{profile.statusMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default Info;
