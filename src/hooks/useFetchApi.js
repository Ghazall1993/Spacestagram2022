import { useState, useEffect } from 'react';

function useFetchApi(apiKey, count) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`)
      .then(response => response.json())
      .then(json => {
        setItems(json)
        setIsLoading(false)
      },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, [apiKey, count])
  return [items, isLoading, error]
}
export default useFetchApi;