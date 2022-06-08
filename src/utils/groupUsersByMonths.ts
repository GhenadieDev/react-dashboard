import React, { SetStateAction } from "react";
import { ChartUserData, Month, User } from "types/interfaces";

export const groupUsersByMonth = (
  users: User[],
  listOfMonths: Month[],
  chartUserData: ChartUserData[],
  setData: React.Dispatch<SetStateAction<ChartUserData[]>>
) => {
  const copy = chartUserData.map((data) => data);
  copy.splice(0, copy.length);

  listOfMonths.forEach((month) => {
    const newObj = {
      name: month.name,
      users: users?.filter(
        (user) =>
          user.createdAt !== undefined &&
          new Date(user.createdAt).getMonth() + 1 === month.number
      ).length,
    };

    copy.push(newObj);
  });
  setData(copy);
};
