import React, { SetStateAction } from "react";
import { ChartUserData, Month, User } from "types/interfaces";

export const groupUsersByMonth = (
  users: User[],
  listOfMonths: Month[],
  setData: React.Dispatch<SetStateAction<ChartUserData[]>>
) => {
  listOfMonths.forEach((month, idx) => {
    const newObj = {
      name: month.name,
      users: users.filter(
        (user) =>
          user.createdAt
            ?.toString()
            .substring(
              user.createdAt.toString().indexOf("-") + 1,
              user.createdAt.toString().lastIndexOf("-")
            ) === month.number
      ).length,
    };

    setData((prevState) => [...prevState, newObj]);
  });
};
