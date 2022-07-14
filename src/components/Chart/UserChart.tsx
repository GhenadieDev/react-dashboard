import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartUserData } from "types/interfaces";

interface ChartUserProps {
  chartUserData: ChartUserData[];
}

export const UserChart = ({ chartUserData }: ChartUserProps) => {
  return (
    <ResponsiveContainer minWidth="50%" height={300}>
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
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 10 }} />
        <YAxis type="number" domain={[0, "dataMax + 10"]} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};
