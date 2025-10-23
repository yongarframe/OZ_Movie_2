import { useEffect, useState } from 'react'
import type { Cast, Crew } from '@/types/movieDetail'
import type { MovieReleaseData } from '@/types/MovieReleaseData'
import {
  fetchMovieCredits,
  fetchMovieReleaseData,
  getKRRating,
} from '@/services/movieDetailService'

export const useMovieDetailData = (movieId: string | undefined) => {
  const [releaseData, setReleaseData] = useState<MovieReleaseData | null>(null)
  const [cast, setCast] = useState<Cast[]>([])
  const [director, setDirector] = useState<Crew | null>(null)
  const [rating, setRating] = useState('')

  useEffect(() => {
    if (!movieId) return

    void (async () => {
      const release = await fetchMovieReleaseData(movieId)
      if (!release) return
      setReleaseData(release)
      setRating(getKRRating(release))

      const credits = await fetchMovieCredits(movieId)
      if (!credits) return
      setCast(credits.cast)
      setDirector(credits.director ?? null)
    })()
  }, [movieId])

  return { releaseData, cast, director, rating }
}
