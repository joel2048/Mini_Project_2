// UNUSED
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(true)
      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error('could not fetch the data for cards');
        } 
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      })
  }, [url])

  return { data, loading, error };
}

export default useFetch;



