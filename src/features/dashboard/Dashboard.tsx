import { useState, useEffect } from "react";
import { userApi } from "api/users";
import { postApi } from "api/posts";
import { Chart, UserChart, PostChart } from "components/index";
import { useQuery } from "react-query";

import { ChartUserData, ChartPostData } from "types/interfaces";
import { listOfMonths } from "types/constants";

import { groupUsersByMonth } from "utils/groupUsersByMonths";
import { groupPostsByMonths } from "utils/groupPostsByMonths";

export const Dashboard = () => {
  const [chartUserData, setChartUserData] = useState<ChartUserData[]>([]);
  const [chartPostData, setChartPostData] = useState<ChartPostData[]>([]);

  const { data: users, isSuccess: isUsers } = useQuery(
    "allUsers",
    async () => await userApi.getAllUsers()
  );
  const { data: posts, isSuccess: isPosts } = useQuery(
    "allPosts",
    async () => await postApi.getAllPosts()
  );

  useEffect(() => {
    if (isUsers) {
      groupUsersByMonth(users?.data, listOfMonths, setChartUserData);
    }
  }, [users?.data, isUsers]);

  useEffect(() => {
    if (isPosts) {
      groupPostsByMonths(posts?.data, listOfMonths, setChartPostData);
    }
  }, [posts?.data, isPosts]);

  return (
    <div className="dashboard">
      <Chart>
        <div className="totals flex">
          <div className="total-users">
            <h5 className="total-users__title">Total Users</h5>
            <h1 className="total-users__count">{users?.data.length}</h1>
          </div>
          <div className="total-posts">
            <h5 className="total-posts__title">Total Posts</h5>
            <h1 className="total-posts__count">{posts?.data.length}</h1>
          </div>
        </div>
        <div className="statistics flex">
          <UserChart chartUserData={chartUserData} />
          <PostChart chartPostData={chartPostData} />
        </div>
      </Chart>
    </div>
  );
};
