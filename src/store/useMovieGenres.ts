import { create } from 'zustand'
import { api } from '@/api/mainApi'

interface Genre {
  id: number
  name: string
}

interface GenreState {
  genres: Genre[]
  fetchGenres: () => Promise<void>
}

export const useMovieGenres = create<GenreState>((set) => ({
  genres: [],
  fetchGenres: async () => {
    try {
      const res = await api.get('/genre/movie/list?language=ko-KR')
      set({ genres: res.data.genres })
    } catch {
      void 0
    }
  },
}))
