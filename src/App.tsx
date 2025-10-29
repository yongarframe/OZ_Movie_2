import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from '@/page/Login'
import MyPage from '@/page/Mypage'
import Layout from '@/page/Layout'
import { useEffect } from 'react'
import MovieDetail from '@/page/MovieDetail'
import NotFound from '@/page/NotFound'
import Search from '@/page/Search'
import Signup from '@/page/Signup'
import { useSupabaseAuth } from '@/supabase'
import { useUserInfo } from '@/store/useUserInfo'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import FavoriteMoviePage from '@/page/FavoriteMoviePage'
import MainPage from '@/page/MainPage'
import GenrePage from '@/page/GenrePage'

function App() {
  const { getUserInfo } = useSupabaseAuth()
  const setUserInfo = useUserInfo((state) => state.setUserInfo)
  const isLogin = useIsUserLogin((state) => state.isLogin)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUserInfo()
      setUserInfo(user)
    }
    fetchUserInfo()
  }, [isLogin]) // 로그인, 로그아웃 시에만 실행

  useEffect(() => {
    const kakao = window.Kakao
    if (kakao && !kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage/favorite" element={<FavoriteMoviePage />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
      </Route>
    </Routes>
  )
}

export default App
