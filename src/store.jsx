import { create } from "zustand";

const API = import.meta.env.VITE_API_TOKEN;

export const useMovieData = create((set) => ({
  movieData: [],
  fetchData: async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=ko`,
      options
    );

    const data = await response.json();
    set((state) => ({ ...state, movieData: data.results }));
  },
}));
