// store/useMovieCategories.ts
import { create } from 'zustand'
import { api } from '@/API/mainApi'
import { type MovieData } from '@/types/MovieData'

interface MovieCategoryState {
  nowPlaying: MovieData[]
  topRated: MovieData[]
  upcoming: MovieData[]
  popular: MovieData[]
  fetchCategories: () => Promise<void>
}

export const useMovieCategories = create<MovieCategoryState>((set) => ({
  nowPlaying: [],
  topRated: [],
  upcoming: [],
  popular: [],
  fetchCategories: async () => {
    const [nowPlayingRes, topRatedRes, upcomingRes, popularRes] =
      await Promise.all([
        api.get(`/now_playing?language=ko-KR&page=1`),
        api.get(`/top_rated?language=ko-KR&page=1`),
        api.get(`/upcoming?language=ko-KR&page=1`),
        api.get(`/popular?language=ko-KR&page=1&region=KR`),
      ])

    set({
      nowPlaying: nowPlayingRes.data.results,
      topRated: topRatedRes.data.results,
      upcoming: upcomingRes.data.results,
      popular: popularRes.data.results,
    })
  },
}))
