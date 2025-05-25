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
import Signup from "./page/Signup";
import { useSupabaseAuth } from "./supabase";
import { useUserInfo } from "./store";
import { useIsUserLogin } from "./store";
// import Search from "./component/Search";

function App() {
  const { fetchData } = useMovieData();
  const { getUserInfo } = useSupabaseAuth();
  const { userInfo, setUserInfo } = useUserInfo();
  const { isLogin } = useIsUserLogin();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUserInfo();
      setUserInfo(user);
    };
    fetchUserInfo();
  }, [isLogin]); // 로그인, 로그아웃 시에만 실행

  console.log(userInfo);

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
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
