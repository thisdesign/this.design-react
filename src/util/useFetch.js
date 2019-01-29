import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await fetch(url);
    setData(await response.json());
  };

  useEffect(() => {
    getData();
  }, []);
  return data;
};

export default useFetch;
