import { useState } from "react";

export const useLoading = (initialState: boolean) => {
  const [isLoading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return [isLoading, startLoading, stopLoading] as const;
};
