import { getActivities } from "api/userApi";
import { Link } from "react-router-dom";
import { IComment, IPost } from "Routes/Post/Post";
import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import { useQuery } from "react-query";

export interface IActivities {
  recentPosts: IPost[];
  recentComments: IComment[];
}

interface IActivitiesResponse {
  data: {
    status: string;
    activities: IActivities;
  };
}

interface IRecentActivityProps {
  nickname: string;
}

function RecentActivity({ nickname }: IRecentActivityProps) {
  const user = useSelector(loggedInUser);
  const { isLoading, data, isError, error } = useQuery<IActivitiesResponse>(
    "getActivities",
    () => getActivities(user.id),
    {
      retry: false,
    }
  );
  // Todo: Error handling
  return (
    <>
      <div className="w-96 mb-10">
        <h3 className="border-b-4 border-main px-1 mb-1 flex">
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
          {nickname}'s Recent posts
        </h3>
        <ul className="space-y-2">
          {data?.data.activities.recentPosts.map((post) => (
            <li
              key={post._id}
              className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1"
            >
              <Link to={`/${post.category}/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-96 mb-10">
        <h3 className="border-b-4 border-main px-1 mb-1 flex">
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
          {nickname}'s Recent comments
        </h3>
        <ul className="space-y-2">
          {data?.data.activities.recentComments.map((comment) => (
            <li
              key={comment._id}
              className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1"
            >
              <Link to={`/${comment.target.category}/${comment.target._id}`}>
                {comment.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecentActivity;
