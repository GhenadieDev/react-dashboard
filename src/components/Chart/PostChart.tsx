import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { ChartPostData } from "types/interfaces";

interface PostChartProps {
  chartPostData: ChartPostData[];
}

export const PostChart = ({ chartPostData }: PostChartProps) => {
  return (
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
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 10 }} />
        <YAxis type="number" domain={[0, "dataMax + 10"]} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="posts" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};
