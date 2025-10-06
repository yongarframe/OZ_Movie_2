import MovieCard from '../component/MovieCard'
import type { MovieData } from '@/types/MovieData'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'
import useIsTouchDevice from '@/hooks/useIsTouchDevice'
import useSearchPageInfiniteScroll from '@/hooks/useSearchPageInfiniteScroll'

export default function MovieSearchRender({
  searchMovieData,
  params,
}: {
  searchMovieData: MovieData[]
  params: string | null
}) {
  const user = useSupabaseUser()
  const touchEnabled = useIsTouchDevice()
  const observerRef = useSearchPageInfiniteScroll(params)

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
