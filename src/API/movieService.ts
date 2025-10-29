// services/movieService.ts
import { api } from '@/API/mainApi'

export const fetchNowPlaying = async () => {
  const res = await api.get(`/movie/now_playing?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchTopRated = async () => {
  const res = await api.get(`/movie/top_rated?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchUpcoming = async () => {
  const res = await api.get(`/movie/upcoming?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchPopular = async () => {
  const res = await api.get(`/movie/popular?language=ko-KR&page=1&region=KR`)
  return res.data.results
}

export const fetchMoviesByGenre = async (genreId: string) => {
  const res = await api.get(
    `/discover/movie?language=ko-KR&page=1&with_genres=${genreId}`
  )
  return res.data.results
}
