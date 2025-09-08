import { create } from 'zustand'
import { type MovieData } from '@/types/MovieData'

interface MovieDataState {
  movieData: MovieData[]
  fetchMovieData: (page: number) => void
}

const API = import.meta.env.VITE_API_TOKEN

export const useMovieData = create<MovieDataState>((set) => ({
  movieData: [],
  fetchMovieData: async (page = 1) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API}`,
      },
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${page}&region=ko`,
      options
    )

    const data = await response.json()
    set((state) => ({
      ...state,
      movieData: [...state.movieData, ...data.results],
    }))
  },
}))
