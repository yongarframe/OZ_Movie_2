import { useCallback, useEffect, useState } from 'react'
import MovieCard from '../component/MovieCard'
import { useMovieData } from '@/store/useMovieData'
import type { MovieData } from '@/types/MovieData'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'

const SLIDE_IMAGE_COUNT = 4

const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    ('msMaxTouchPoints' in navigator &&
      (navigator as Navigator & { msMaxTouchPoints: number }).msMaxTouchPoints >
        0)
  )
}

export default function MovieCardRender({
  movieData,
}: {
  movieData: MovieData[]
}) {
  const fetchMovieData = useMovieData((state) => state.fetchMovieData)
  const slideMovieData = movieData.slice(0, SLIDE_IMAGE_COUNT)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const user = useSupabaseUser()
  const [touchEnabled, setTouchEnabled] = useState(false)

  useEffect(() => {
    setTouchEnabled(isTouchDevice()) // 초기 실행
  }, [])

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
    [page, loading]
  )

  useEffect(() => {
    if (movieData.length === 0) {
      fetchMovieData(page)
    }
  }, [])

  if (!Array.isArray(slideMovieData) || slideMovieData.length <= 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden text-white">
      {/* Hero */}

      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <MovieCard
              key={`${movie.id}${movie.title}`}
              {...movie}
              userId={user?.id}
              touchEnabled={touchEnabled}
            />
          ))}
        </div>
      </div>
      {movieData.length > 0 && <div ref={observerRef}></div>}
    </div>
  )
}
