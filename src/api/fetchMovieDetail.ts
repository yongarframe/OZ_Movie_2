import type { MovieDetail } from '@/types/movieDetail'

const API = import.meta.env.VITE_API_TOKEN

export async function fetchMovieDetail(id: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API}`,
    },
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ko`,
    options
  )

  if (!response.ok) {
    throw new Error('영화 정보를 불러오지 못했습니다.')
  }

  const data: MovieDetail = await response.json()

  return data
}
