import { getAllUsers } from "api/users";
import { getAllPosts } from "api/posts";
import { Chart } from "components/index";
import { useState, useEffect } from "react";
import { User, Post } from "types/interfaces";

import "../../styles/Dashboard.scss";

export const Dashboard = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

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
      <Chart users={allUsers} posts={allPosts} />
    </div>
  );
};
