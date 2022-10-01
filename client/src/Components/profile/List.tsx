import { IComment, IPost } from "Routes/Post/Post";
import Item from "./Item";

interface IList {
  type: "Posts" | "Comments";
  recentActivity: IPost[] | IComment[];
  nickname: string;
}

function List({ type, recentActivity, nickname }: IList) {
  return (
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
        {nickname}'s Recent {type}
      </h3>
      <ul className="space-y-2">
        {recentActivity.length !== 0 ? (
          recentActivity.map((item) => <Item item={item} />)
        ) : (
          <li className="flex justify-center py-16">
            아직 작성한 글이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}

export default List;
