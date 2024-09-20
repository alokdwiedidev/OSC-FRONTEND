import { useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (value) => {
    setIsLoading(value)
  }

  return {
    isLoading,
    handleLoading
  };
};

export default useLoader;
