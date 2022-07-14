import { useState } from "react";
import { useQuery } from "react-query";

import { userApi } from "api/users";
import { postApi } from "api/posts";

import { groupUsersByMonth } from "utils/groupUsersByMonths";
import { groupPostsByMonths } from "utils/groupPostsByMonths";

import { ChartUserData, ChartPostData } from "types/interfaces";
import { listOfMonths } from "types/constants";

import { Chart, UserChart, PostChart, Loader } from "components/index";

export const Dashboard = () => {
  const [chartUserData, setChartUserData] = useState<ChartUserData[]>([]);
  const [chartPostData, setChartPostData] = useState<ChartPostData[]>([]);

  const { data: users, isLoading: usersIsLoading } = useQuery(
    "allUsers",
    () => userApi.getAllUsers(),
    {
      onSuccess: (res) => {
        groupUsersByMonth(res, listOfMonths, chartUserData, setChartUserData);
      },
    }
  );

  const { data: posts, isLoading: postsIsLoading } = useQuery(
    "allPosts",
    () => postApi.getAllPosts(),
    {
      onSuccess: (res) => {
        groupPostsByMonths(res, listOfMonths, chartPostData, setChartPostData);
      },
    }
  );

  return (
    <div className="dashboard">
      <Loader
        fade
        fixed
        height="100%"
        size="regular"
        loading={usersIsLoading && postsIsLoading ? true : false}
      >
        <Chart>
          <div className="totals flex">
            <div className="total-users">
              <h5 className="total-users__title">Total Users</h5>
              <h1 className="total-users__count">{users?.length}</h1>
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
        </Chart>
      </Loader>
    </div>
  );
};
