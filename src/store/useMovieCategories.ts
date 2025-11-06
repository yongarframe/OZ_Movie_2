// hooks/useMovies.ts
import { useQuery } from '@tanstack/react-query'
import {
  fetchNowPlaying,
  fetchTopRated,
  fetchUpcoming,
  fetchPopular,
} from '@/api/movieService'
import type { MovieData } from '@/types/MovieData'

export const useNowPlaying = (enabled = true) =>
  useQuery<MovieData[]>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: fetchNowPlaying,
    staleTime: 1000 * 60 * 5,
    enabled,
  })

export const useTopRated = (enabled = true) =>
  useQuery<MovieData[]>({
    queryKey: ['movies', 'topRated'],
    queryFn: fetchTopRated,
    staleTime: 1000 * 60 * 5,
    enabled,
  })

export const useUpcoming = (enabled = true) =>
  useQuery<MovieData[]>({
    queryKey: ['movies', 'upcoming'],
    queryFn: fetchUpcoming,
    staleTime: 1000 * 60 * 5,
    enabled,
  })

export const usePopular = (enabled = true) =>
  useQuery<MovieData[]>({
    queryKey: ['movies', 'popular'],
    queryFn: fetchPopular,
    staleTime: 1000 * 60 * 5,
    enabled,
  })
