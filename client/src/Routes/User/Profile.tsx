import { useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Activities from "Components/user/Activities";
import RecentActivity from "Components/user/RecentActivity";
import ProfileMenuNav from "Components/user/ProfileMenuNav";
import { getProfile } from "api/userApi";
import { useQuery } from "react-query";

export interface IProfileResponse {
  data: {
    status: string;
    user: IUser;
  };
}

function Profile() {
  const user = useSelector(loggedInUser);
  const { isLoading, data, isError, error } = useQuery<IProfileResponse>(
    [user.id, "getProfile"],
    () => getProfile(user.id),
    {
      retry: false,
    }
  );
  // ToDo: Error Handling
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
              src={"/" + data?.data.user.avatar}
              className="bg-white w-32 h-32 rounded-full mb-4"
            />
            <div className="flex flex-col ml-14 space-y-4">
              <span>{data?.data.user.nickname}</span>
              <span>{data?.data.user.statusMessage}</span>
            </div>
          </div>
        </div>
        <div>
          <Activities />
          <ProfileMenuNav />
          <RecentActivity nickname={user.nickname} />
        </div>
      </div>
    </Wrapper>
  );
}

export default Profile;
