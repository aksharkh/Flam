import { useState, useMemo } from 'react'

export default function useSearch(items, keys = []) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!items) return []
    return items.filter(item =>
      keys.some(k =>
        item[k].toString().toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [items, query, keys])

  return { query, setQuery, filtered }
}
