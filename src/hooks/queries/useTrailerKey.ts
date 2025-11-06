import { fetchTrailer } from '@/api/fetchTrailerKey'
import { useQuery } from '@tanstack/react-query'

export function useTrailerKey(id: string, hover: boolean) {
  return useQuery({
    queryFn: () => fetchTrailer(id),
    queryKey: ['TrailerKey', id],
    staleTime: 60 * 60 * 1000,
    enabled: hover,
  })
}
