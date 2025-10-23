import { api } from '@/API/mainApi'
import type { FetchCredits } from '@/types/movieDetail'
import type { MovieReleaseData } from '@/types/MovieReleaseData'

export const fetchMovieReleaseData = async (movieId: string | undefined) => {
  if (!movieId) return
  const { data } = await api.get<MovieReleaseData | null>(
    `/movie/${movieId}/release_dates`
  )
  return data
}

export const fetchMovieCredits = async (movieId: string | undefined) => {
  if (!movieId) return { cast: [], director: null }
  try {
    const { data } = await api.get<FetchCredits>(
      `/movie/${movieId}/credits?language=ko-KR`
    )
    const cast = data.cast.slice(0, 5)
    const director = data.crew.find((c) => c.job === 'Director')
    return { cast, director }
  } catch {
    return { cast: [], director: null }
  }
}

export const getKRRating = (releaseData: MovieReleaseData | null): string => {
  if (!releaseData) return ''
  const krRelease = releaseData.results.find((r) => r.iso_3166_1 === 'KR')
    ?.release_dates[0]
  return krRelease?.certification ?? ''
}
