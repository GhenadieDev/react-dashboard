import { ChartPostData, ChartUserData, Post, User } from "types/interfaces";
import { UserChart } from "./UserChart";
import { PostChart } from "./PostChart";

import "styles/Chart.scss";

interface ChartProps {
  users: User[];
  posts: Post[];
  chartUserData: ChartUserData[];
  chartPostData: ChartPostData[];
}

export const Chart = ({
  users,
  posts,
  chartUserData,
  chartPostData,
}: ChartProps) => {
  return (
    <div className="chart flex">
      <div className="totals flex">
        <div className="total-users">
          <h5 className="total-users__title">Total Users</h5>
          <h1 className="total-users__count">{users.length}</h1>
        </div>
        <div className="total-posts">
          <h5 className="total-posts__title">Total Posts</h5>
          <h1 className="total-posts__count">{posts?.length}</h1>
        </div>
      </div>
      <div className="statistics flex">
        <UserChart chartUserData={chartUserData} />
        <PostChart chartPostData={chartPostData} />
      </div>
    </div>
  );
};
