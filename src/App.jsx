// import { useState } from "react";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import Login from "./page/login";
import MyPage from "./page/mypage";
import Layout from "./page/layout";
import { useMovieData } from "./store";
import { useEffect } from "react";
import MovieCard from "./page/MovieCard";

function App() {
  const { fetchData } = useMovieData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
