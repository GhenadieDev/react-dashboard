export const getDate = (date: Date) => {
  const time = new Date(date);
  return time.toLocaleString("en-UK");
};
