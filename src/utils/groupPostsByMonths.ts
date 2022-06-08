import { SetStateAction } from "react";
import { ChartPostData, Month, Post } from "types/interfaces";

export const groupPostsByMonths = (
  posts: Post[],
  listOfMonths: Month[],
  chartPostData: ChartPostData[],
  setData: React.Dispatch<SetStateAction<ChartPostData[]>>
) => {
  const copy = chartPostData.map((data) => data);
  copy.splice(0, copy.length);

  listOfMonths.forEach((month) => {
    const newObj = {
      name: month.name,
      posts: posts?.filter(
        (post) =>
          post.date !== undefined &&
          new Date(post.date).getMonth() + 1 === month.number
      ).length,
    };
    copy.push(newObj);
  });

  setData(copy);
};
