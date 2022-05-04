import { getAllUsers } from "api/users";
import { getAllPosts } from "api/posts";
import { Chart } from "components/index";
import { useState, useEffect } from "react";
import { User, Post, ChartUserData, ChartPostData } from "types/interfaces";

import { groupUsersByMonth } from "utils/groupUsersByMonths";
import { listOfMonths } from "types/constants";

import "../../styles/Dashboard.scss";
import { groupPostsByMonths } from "utils/groupPostsByMonths";

export const Dashboard = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chartUserData, setChartUserData] = useState<ChartUserData[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [chartPostData, setChartPostData] = useState<ChartPostData[]>([]);

  useEffect(() => {
    getAllUsers().then((res) => {
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
    if (allPosts.length > 0) {
      groupPostsByMonths(allPosts, listOfMonths, setChartPostData);
    }
  }, [allPosts]);

  useEffect(() => {
    getAllPosts().then((res) => {
      if (res) {
        res.data.forEach((post: Post) => {
          setAllPosts((prevState) => [...prevState, post]);
        });
      }
    });
  }, []);

  return (
    <div className="_dashboard">
      <Chart
        users={allUsers}
        posts={allPosts}
        chartUserData={chartUserData}
        chartPostData={chartPostData}
      />
    </div>
  );
};
