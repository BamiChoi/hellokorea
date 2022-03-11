interface RecentActivityProps {
  nickname: string;
  activity: string;
}

function RecentActivity({ nickname, activity }: RecentActivityProps) {
  return (
    <div className="w-96 mb-10">
      <h1 className="border-b-4 border-main px-1 mb-1 flex">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
        {nickname}'s {activity}
      </h1>
      <ul className="space-y-2">
        <li className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1">
          asdfadsfasdf
        </li>
        <li className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1">
          asdfadsfasdf
        </li>
        <li className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1">
          asdfadsfasdf
        </li>
        <li className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1">
          asdfadsfasdf
        </li>
        <li className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1">
          asdfadsfasdf
        </li>
      </ul>
    </div>
  );
}

export default RecentActivity;
