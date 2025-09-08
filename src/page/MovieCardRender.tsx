import { useCallback, useEffect, useState } from 'react'
import MovieCard from '../component/MovieCard'
import { useMovieData } from '@/store/useMovieData'

export default function MovieCardRender() {
  const fetchMovieData = useMovieData((state) => state.fetchMovieData)
  const [page, setPage] = useState(1)
  const movieData = useMovieData((state) => state.movieData)
  const [loading, setLoading] = useState(false)

  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setLoading(true)
            await fetchMovieData(page + 1)
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
    [page]
  )

  useEffect(() => {
    fetchMovieData(page)
  }, [])

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <MovieCard key={`${movie.id}${movie.title}`} {...movie} />
          ))}
        </div>
      </div>
      {movieData.length > 0 && <div ref={observerRef}></div>}
    </div>
  )
}
