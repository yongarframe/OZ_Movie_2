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
    const data = await response.json();

    set((state) => ({ ...state, movieDetail: data }));
  },
}));

export const useSearchMovie = create((set) => ({
  videoMovie: [],
  fetchVideoMovie: async (params) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=ko&page=1`,
      options
    );
    const data = await response.json();
    set(() => ({ videoMovie: data.results }));
  },
}));

export const useVideoMovie = create((set) => ({
  videoMovie: [],
  fetchVideoMovie: async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
    const data = await response.json();

    // console.log(data);
    set(() => ({ videoMovie: data.results }));
  },
}));

export const useUserInfo = create((set) => ({
  userInfo: "",
  setUserInfo: async (userInfo) => {
    set(() => ({ userInfo: userInfo }));
  },
}));

export const useIsUserLogin = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) =>
    set(() => {
      return { isLogin: !!isLogin };
    }),
}));
