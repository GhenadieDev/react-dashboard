import { dateTime } from "types/date";

export const getDate = (date: typeof dateTime) => {
  return date?.toString().substring(0, date?.toString().indexOf("T"));
};

//daca ma folosesc de date.getMonth imi arata luna incorecta.
