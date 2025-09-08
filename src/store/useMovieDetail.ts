import type { MovieDetail } from '@/types/movieDetail'
import { create } from 'zustand'

interface MovieDetailState {
  movieDetail: MovieDetail | null
  fetchMovieDetail: (page: string) => void
}

const API = import.meta.env.VITE_API_TOKEN

export const useMovieDetail = create<MovieDetailState>((set) => ({
  movieDetail: null,
  fetchMovieDetail: async (id) => {
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
    const data = await response.json()

    set((state) => ({ ...state, movieDetail: data }))
  },
}))
