import { IActivities } from "Routes/User/MyProfile";
import List from "./List";

interface IRecentActivityProps {
  nickname: string;
  activities: IActivities;
}

function RecentActivity({ nickname, activities }: IRecentActivityProps) {
  return (
    <>
      <List
        type="Posts"
        recentActivity={activities.recentPosts}
        nickname={nickname}
      />
      <List
        type="Comments"
        recentActivity={activities.recentComments}
        nickname={nickname}
      />
    </>
  );
}

export default RecentActivity;
