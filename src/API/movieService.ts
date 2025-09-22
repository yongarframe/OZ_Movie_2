// services/movieService.ts
import { api } from '@/API/mainApi'

export const fetchNowPlaying = async () => {
  const res = await api.get(`/now_playing?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchTopRated = async () => {
  const res = await api.get(`/top_rated?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchUpcoming = async () => {
  const res = await api.get(`/upcoming?language=ko-KR&page=1`)
  return res.data.results
}

export const fetchPopular = async () => {
  const res = await api.get(`/popular?language=ko-KR&page=1&region=KR`)
  return res.data.results
}
