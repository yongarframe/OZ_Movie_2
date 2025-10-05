import { api } from '@/API/mainApi'
import type { MovieData } from '@/types/MovieData'
import { create } from 'zustand'

interface SearchMovieState {
  searchMovie: MovieData[]
  fetchSearchMovie: (params: string | null, page?: number) => void
}

export const useSearchMovie = create<SearchMovieState>((set) => ({
  searchMovie: [],
  fetchSearchMovie: async (params, page = 1) => {
    const { data } = await api.get(
      `search/movie?query=${params}&include_adult=false&language=ko&page=${page}`
    )

    set((state) => ({
      searchMovie:
        page === 1 ? data.results : [...state.searchMovie, ...data.results],
    }))
  },
}))
