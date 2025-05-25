import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./page/login";
import MyPage from "./page/mypage";
import Layout from "./page/layout";
import { useMovieData } from "./store";
import { useEffect } from "react";
import MovieCard from "./page/MovieCard";
import MovieDetail from "./page/MovieDetail";
import NotFound from "./page/NotFound";
import Search from "./component/Search";

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
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
