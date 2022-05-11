import { useState, useEffect } from "react";
import { userApi } from "api/users";
import { postApi } from "api/posts";
import { Chart, UserChart, PostChart } from "components/index";

import { User, Post, ChartUserData, ChartPostData } from "types/interfaces";
import { listOfMonths } from "types/constants";

import { groupUsersByMonth } from "utils/groupUsersByMonths";
import { groupPostsByMonths } from "utils/groupPostsByMonths";

export const Dashboard = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [chartUserData, setChartUserData] = useState<ChartUserData[]>([]);
  const [chartPostData, setChartPostData] = useState<ChartPostData[]>([]);

  useEffect(() => {
    userApi.getAllUsers().then((res) => {
      if (res) {
        res.data.forEach((user: User) => {
          setAllUsers((prevState) => [...prevState, user]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      groupUsersByMonth(allUsers, listOfMonths, setChartUserData);
    }
  }, [allUsers]);

  useEffect(() => {
    postApi.getAllPosts().then((res) => {
      if (res) {
        res.data.forEach((post: Post) => {
          setAllPosts((prevState) => [...prevState, post]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (allPosts.length > 0) {
      groupPostsByMonths(allPosts, listOfMonths, setChartPostData);
    }
  }, [allPosts]);

  return (
    <div className="dashboard">
      <Chart>
        <div className="totals flex">
          <div className="total-users">
            <h5 className="total-users__title">Total Users</h5>
            <h1 className="total-users__count">{allUsers.length}</h1>
          </div>
          <div className="total-posts">
            <h5 className="total-posts__title">Total Posts</h5>
            <h1 className="total-posts__count">{allPosts.length}</h1>
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
