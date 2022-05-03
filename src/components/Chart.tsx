import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { listOfMonths } from "types/constants";

import { ChartData, Post, User } from "types/interfaces";
import { groupUsersByMonth } from "utils/groupUsersByMonths";
import "../styles/Chart.scss";

interface ChartProps {
  users?: User[];
  posts?: Post[];
}

export const Chart = ({ users, posts }: ChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);

  const setDataCall = (obj: ChartData) => {
    console.log("chart data: ", obj);
    setData((prevState) => [...prevState, obj]);
  };

  useEffect(() => {
    if (users && listOfMonths) {
      groupUsersByMonth(users, listOfMonths, setDataCall);
    }
  }, [users]);

  return (
    <div className="chart">
      <div className="totals">
        <div className="total-users">
          <h5>Total Users</h5>
          <h1>{users?.length}</h1>
        </div>
        <div className="total-posts">
          <h5>Total Posts</h5>
          <h1>{posts?.length}</h1>
        </div>
      </div>
      <div className="statistics">
        <div className="user-chart">
          <BarChart
            width={900}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};
