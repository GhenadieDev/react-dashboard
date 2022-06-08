import { dateTime } from "types/date";

export const getDate = (date: typeof dateTime) => {
  const time = new Date(date);
  return time.toLocaleString("en-UK");
};
