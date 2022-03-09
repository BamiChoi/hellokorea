import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import { Link } from "react-router-dom";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";

function Profile() {
  const user = useSelector(loggedInUser);
  const { nickname, statusMessage, avatar } = user || {};
  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center justify-center px-10">
        <Title text="My page" />
        <div className="h-42  mx-10 rounded-xl w-full bg-cream flex flex-col justify-start items-center py-5 mb-5">
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
              src={"/" + avatar}
              className="bg-white w-32 h-32 rounded-full mb-4"
            />
            <div className="flex flex-col ml-14 space-y-4">
              <span>{nickname}</span>
              <span>{statusMessage}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 mb-8 border-b-2 border-main pb-4">
            <div className="bg-main flex justify-center items-center text-white rounded-md">
              total posts
            </div>
            <div className="bg-main flex justify-center items-center text-white rounded-md">
              total comments
            </div>
            <div className="bg-main flex justify-center items-center text-white rounded-md">
              total upvote
            </div>
            <div className="text-center text-3xl">234</div>
            <div className="text-center text-3xl">120</div>
            <div className="text-center text-3xl">100</div>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-2 mb-8">
            <div className="bg-main rounded-full w-24 h-24 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-powermain">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
              </svg>
              bookmark
            </div>
            <Link to="/user/edit">
              <div className="bg-main rounded-full w-24 h-24 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-powermain">
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
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  ></path>
                </svg>
                Eidt porfile
              </div>
            </Link>
            <div className="bg-main rounded-full w-24 h-24 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-powermain">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              My QnA
            </div>
          </div>
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
              {nickname}'s Recent Posts
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
          <div>
            <h1 className="border-b-4 border-main px-1 mb-1 flex">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {nickname}'s Recent Comment
            </h1>
            <div>
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Profile;
