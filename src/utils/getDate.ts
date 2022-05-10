import { dateTime } from "types/date";

export const getDate = (date: typeof dateTime | undefined) => {
  return date?.toString().substring(0, date?.toString().indexOf("T"));
};
