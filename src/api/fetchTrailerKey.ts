import type { movieCardData } from '@/types/movieCardData'

const API = import.meta.env.VITE_API_TOKEN

export async function fetchTrailer(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API}`,
    },
  })
  const data: movieCardData = await res.json()
  const trailer = data.results[1] ?? data.results[0]
  return trailer.key
}
