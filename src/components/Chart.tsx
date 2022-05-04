import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartPostData, ChartUserData, Post, User } from "types/interfaces";
import "../styles/Chart.scss";

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
    <div className="chart">
      <div className="totals">
        <div className="total-users">
          <h5>Total Users</h5>
          <h1>{users.length}</h1>
        </div>
        <div className="total-posts">
          <h5>Total Posts</h5>
          <h1>{posts?.length}</h1>
        </div>
      </div>
      <div className="statistics">
        <ResponsiveContainer minWidth="50%" height={300} id="user__chart">
          <BarChart
            data={chartUserData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 10 }}
            />
            <YAxis type="number" domain={[0, "dataMax + 10"]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer minWidth="50%" height={300} id="post__chart">
          <BarChart
            data={chartPostData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 10 }}
            />
            <YAxis type="number" domain={[0, "dataMax + 10"]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="posts" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
