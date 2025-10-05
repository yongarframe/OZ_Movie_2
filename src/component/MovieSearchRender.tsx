import { useCallback, useState } from 'react'
import MovieCard from '../component/MovieCard'
import type { MovieData } from '@/types/MovieData'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'
import useIsTouchDevice from '@/hooks/useIsTouchDevice'
import { useSearchMovie } from '@/store/useSearchMovie'

const SLIDE_IMAGE_COUNT = 4

export default function MovieSearchRender({
  searchMovieData,
  params,
}: {
  searchMovieData: MovieData[]
  params: string | null
}) {
  const fetchSearchMovie = useSearchMovie((state) => state.fetchSearchMovie)
  const slideMovieData = searchMovieData.slice(0, SLIDE_IMAGE_COUNT)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const user = useSupabaseUser()
  const touchEnabled = useIsTouchDevice()

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
    [page, loading]
  )

  if (!Array.isArray(slideMovieData) || slideMovieData.length <= 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden text-white">
      {/* Hero */}

      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchMovieData.map((movie) => (
            <MovieCard
              key={`${movie.id}${movie.title}`}
              {...movie}
              userId={user?.id}
              touchEnabled={touchEnabled}
            />
          ))}
        </div>
      </div>
      {searchMovieData.length > 0 && (
        <div ref={observerRef} className="h-1"></div>
      )}
    </div>
  )
}
