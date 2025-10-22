import type { MovieDetail } from '@/types/movieDetail'
import { create } from 'zustand'

interface MovieDetailState {
  movieDetail: MovieDetail | null
  isLoading: boolean
  error: string | null
  fetchMovieDetail: (page: string) => void
}

const API = import.meta.env.VITE_API_TOKEN

export const useMovieDetail = create<MovieDetailState>((set) => ({
  movieDetail: null,
  isLoading: false,
  error: null,
  fetchMovieDetail: async (id) => {
    try {
      set({ isLoading: true })
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

      const data = await response.json()

      set((state) => ({ ...state, movieDetail: data }))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },
}))
