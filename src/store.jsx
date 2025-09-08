import { create } from 'zustand'

const API = import.meta.env.VITE_API_TOKEN

export const useVideoMovie = create((set) => ({
  videoMovie: [],
  fetchVideoMovie: async (id) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API}`,
      },
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    )
    const data = await response.json()

    set(() => ({ videoMovie: data.results }))
  },
}))
