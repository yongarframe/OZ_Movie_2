import { useSearchMovie } from '@/store/useSearchMovie'
import { useCallback, useState } from 'react'

export default function useSearchPageInfiniteScroll(params: string | null) {
  const fetchSearchMovie = useSearchMovie((state) => state.fetchSearchMovie)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setLoading(true)
            await fetchSearchMovie(params, page + 1)
            setPage((prev) => prev + 1)
            setLoading(false)
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(node)

      return () => {
        if (observer && node) observer.unobserve(node)
      }
    },
    [page, loading, fetchSearchMovie, params]
  )
  return observerRef
}
