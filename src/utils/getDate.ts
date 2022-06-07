import { dateTime } from "types/date";

export const getDate = (date: typeof dateTime) => {
  return date?.toString().substring(0, date?.toString().indexOf("T"));
};

//Proper Date utils isn't working
//if I write console.log(date.getMonth()) I get the error: getMonth() is not a function
