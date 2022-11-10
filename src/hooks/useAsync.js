import { useState } from "react";

const useAsync = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const removeData = () => setData(null);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await callback();
      setIsLoading(false);
      setData(result);
    } catch (e) {
      setError(true);
    }
  };

  return { fetchData, data, isLoading, error, removeData };
};

export default useAsync;
