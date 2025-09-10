import MovieCard from '@/component/MovieCard'
import { getFavorites } from '@/supabase/moviefavorite/favorites'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'
import type { FavoriteMovieData } from '@/types/favoriteMovieData'
import { useEffect, useState } from 'react'

export default function FavoriteMoviePage() {
  const user = useSupabaseUser()
  const [favoriteMovieData, setFavoriteMovieData] = useState<
    FavoriteMovieData[] | null
  >(null)

  useEffect(() => {
    if (!user) return
    getFavorites(user.id).then((data: FavoriteMovieData[]) => {
      setFavoriteMovieData(data)
    })
  }, [user])

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteMovieData?.map((movie) => (
            <MovieCard
              key={`${movie.movie_id}${movie.title}`}
              id={movie.movie_id}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              title={movie.title}
              popularity={movie.popularity}
              userId={user?.id}
              onToggleFavorite={() => {
                setFavoriteMovieData(
                  (prev) =>
                    prev?.filter((m) => m.movie_id !== movie.movie_id) || null
                )
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
