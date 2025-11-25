import { fetchMovieDetail } from '@/api/fetchMovieDetail'
import { useQuery } from '@tanstack/react-query'

export function useMovieDetail(id: string) {
  return useQuery({
    queryFn: ({ signal }) => fetchMovieDetail(id, signal),
    queryKey: ['movieDetail', id],
    enabled: !!id,
  })
}
