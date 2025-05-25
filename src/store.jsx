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

export const useMovieDetail = create((set) => ({
  movieDetail: [],
  fetchMovieDetail: async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko`,
      options
    );
    console.log(response);
    const data = await response.json();

    set((state) => ({ ...state, movieDetail: data }));
  },
}));

export const useSearchMovie = create((set) => ({
  searchMovie: [],
  fetchSearchMovie: async (params) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    console.log("useSearchMovie params", params);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=ko&page=1`,
      options
    );
    const data = await response.json();
    console.log("data", data);
    set((state) => ({ ...state, searchMovie: data.results }));
  },
}));
