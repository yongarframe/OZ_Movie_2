import { useGenreMovie } from '@/store/useGenreMovie'
import { useState } from 'react'

export default function useGenrePageInfiniteScroll(
  params: string | null,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const fetchGenreMovie = useGenreMovie((state) => state.fetchGenreMovie)
  const [loading, setLoading] = useState(false)

  const observerRef = (node: HTMLElement | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true)
          await fetchGenreMovie(params, page + 1)
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
  }

  return observerRef
}
