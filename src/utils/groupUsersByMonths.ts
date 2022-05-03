import { ChartData, Month, User } from "types/interfaces";

export const groupUsersByMonth = (
  users: User[],
  listOfMonths: Month[],
  setDataCall: (obj: ChartData) => void
) => {
  listOfMonths.forEach((month) => {
    const newObj: ChartData = {
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

    setDataCall(newObj);
  });
};
