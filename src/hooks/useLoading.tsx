import { useEffect, useState } from "react";

export const useLoading = () => {
  const [isLoading, setLoading] = useState(false);

  /*const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);*/
  const toggleLoading = () => {
    setLoading((prevState) => !prevState);
  };

  useEffect(() => {
    console.log("loading...");
  }, [isLoading]);

  return [isLoading, toggleLoading] as const;
};
