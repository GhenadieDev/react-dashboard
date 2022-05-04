import { SetStateAction } from "react";
import { ChartPostData, Month, Post } from "types/interfaces";

export const groupPostsByMonths = (
  posts: Post[],
  listOfMonths: Month[],
  setData: React.Dispatch<SetStateAction<ChartPostData[]>>
) => {
  listOfMonths.forEach((month, idx) => {
    const newObj = {
      name: month.name,
      posts: posts.filter(
        (post) =>
          post.date
            ?.toString()
            .substring(
              post.date.toString().indexOf("-") + 1,
              post.date.toString().lastIndexOf("-")
            ) === month.number
      ).length,
    };

    setData((prevState) => [...prevState, newObj]);
  });
};
