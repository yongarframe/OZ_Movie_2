import { useEffect, useState } from 'react'

export default function useDebounce(value, delay = 1000) {
  const [query, setQuery] = useState(value)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setQuery(value)
    }, delay)
    return () => clearTimeout(debounceTimer)
  }, [delay, value])
  return query
}
