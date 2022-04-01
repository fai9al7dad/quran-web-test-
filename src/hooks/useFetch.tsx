import React, { useEffect, useState } from "react";
const useFetch = (url = "") => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrors(null);
    fetch(`https://api.quran.com/api/v4/${url}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setErrors(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.log("err", err);

          setErrors(err.response);
          setData(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [url]);
  return {
    loading,
    setLoading,
    errors,
    setErrors,
    data,
    setData,
  };
};

export default useFetch;
