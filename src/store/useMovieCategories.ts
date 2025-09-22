// hooks/useMovieCategories.ts
import { useQuery } from '@tanstack/react-query'
import {
  fetchNowPlaying,
  fetchTopRated,
  fetchUpcoming,
  fetchPopular,
} from '@/API/movieService'
import { type MovieData } from '@/types/MovieData'

export const useMovieCategories = () => {
  const { data: nowPlaying = [], isLoading: nowPlayingLoading } = useQuery<
    MovieData[]
  >({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: fetchNowPlaying,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })

  const { data: topRated = [], isLoading: topRatedLoading } = useQuery<
    MovieData[]
  >({
    queryKey: ['movies', 'topRated'],
    queryFn: fetchTopRated,
    staleTime: 1000 * 60 * 5,
  })

  const { data: upcoming = [], isLoading: upcomingLoading } = useQuery<
    MovieData[]
  >({
    queryKey: ['movies', 'upcoming'],
    queryFn: fetchUpcoming,
    staleTime: 1000 * 60 * 5,
  })

  const { data: popular = [], isLoading: popularLoading } = useQuery<
    MovieData[]
  >({
    queryKey: ['movies', 'popular'],
    queryFn: fetchPopular,
    staleTime: 1000 * 60 * 5,
  })

  return {
    nowPlaying,
    topRated,
    upcoming,
    popular,
    loading:
      nowPlayingLoading || topRatedLoading || upcomingLoading || popularLoading,
  }
}
