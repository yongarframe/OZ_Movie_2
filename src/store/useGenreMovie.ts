import { api } from '@/api/mainApi'
import type { MovieData } from '@/types/MovieData'
import { create } from 'zustand'

interface useGenreMovieState {
  genreMovie: MovieData[]
  fetchGenreMovie: (params: string | null, page?: number) => void
}

export const useGenreMovie = create<useGenreMovieState>((set) => ({
  genreMovie: [],
  fetchGenreMovie: async (genreId, page = 1) => {
    const { data } = await api.get(
      `/discover/movie?language=ko-KR&with_genres=${genreId}&page=${page}`
    )

    set((state) => ({
      genreMovie:
        page === 1 ? data.results : [...state.genreMovie, ...data.results],
    }))
  },
}))
