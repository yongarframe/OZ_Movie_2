import { create } from 'zustand'
import { type MovieData } from '@/types/MovieData'
import { api } from '@/api/mainApi'

interface MovieDataState {
  movieData: MovieData[]
  fetchMovieData: (page: number) => void
}

export const useMovieData = create<MovieDataState>((set) => ({
  movieData: [],
  fetchMovieData: async (page = 1) => {
    const { data } = await api.get(
      `/movie/popular?language=ko&page=${page}&region=ko`
    )

    set((state) => ({
      ...state,
      movieData: [...state.movieData, ...data.results],
    }))
  },
}))
