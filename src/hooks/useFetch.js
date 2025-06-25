import { useState, useEffect } from 'react'

export default function useFetch(fetchFn, args = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchFn(...args)
      .then(res => setData(res))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [fetchFn, ...args])

  return { data, loading, error }
}
