import type { MovieData } from '@/types/MovieData'
import { create } from 'zustand'

interface SearchMovieState {
  searchMovie: MovieData[]
  fetchSearchMovie: (params: string | null) => void
}

const API = import.meta.env.VITE_API_TOKEN

export const useSearchMovie = create<SearchMovieState>((set) => ({
  searchMovie: [],
  fetchSearchMovie: async (params) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API}`,
      },
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=ko&page=1`,
      options
    )
    const data = await response.json()
    set(() => ({ searchMovie: data.results }))
  },
}))
