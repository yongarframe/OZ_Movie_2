import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '@/supabase/moviefavorite/favorites'
import type { FavoriteMovieData } from '@/types/favoriteMovieData'

export function useFavorites(userId: string | undefined) {
  const queryClient = useQueryClient()

  const favoritesQuery = useQuery<FavoriteMovieData[]>({
    queryKey: ['favorites', userId],
    queryFn: () => getFavorites(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분 캐싱
  })

  const toggleFavorite = useMutation({
    mutationFn: async (movie: FavoriteMovieData) => {
      if (!userId) throw new Error('로그인이 필요합니다')
      const isFav = favoritesQuery.data?.some(
        (m) => m.movie_id === movie.movie_id
      )

      if (isFav) {
        await removeFavorite(userId, movie.movie_id)
      } else {
        await addFavorite({
          userId,
          movieId: movie.movie_id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          popularity: movie.popularity,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    },
  })

  return {
    ...favoritesQuery,
    toggleFavorite: toggleFavorite.mutate,
  }
}
