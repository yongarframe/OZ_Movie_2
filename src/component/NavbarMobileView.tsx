import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSupabaseAuth } from '../supabase'
import loginIcon from '@/assets/loginicon.png'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import type { UserInfo } from '@/types/userInfo'
import mainLogo from '@/assets/main-logo.png'
import { Menu, X } from 'lucide-react'
import useSearchEnter from '@/hooks/useSearchEnter'

export default function NavbarMobileView({
  search,
  setSearch,
  userInfo,
  useImageUrl,
  setUserInfo,
}: {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  userInfo: UserInfo | null
  useImageUrl: string | undefined
  setUserInfo: (userInfo: UserInfo | null) => void
}) {
  const navigate = useNavigate()
  const { logout } = useSupabaseAuth()
  const { setIsLogin } = useIsUserLogin()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsLogin(false)
    setUserInfo(null)
  }
  const handleSearch = (e?: React.MouseEvent | React.FormEvent) => {
    e?.preventDefault()
    if (search.trim() === '') {
      navigate('/')
    } else {
      navigate(`/search?movie=${search}`)
    }
  }

  const { handleCompositionStart, handleCompositionEnd } =
    useSearchEnter(handleSearch)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <button
          className="text-xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          <img src={mainLogo} alt="mainLogo" className="h-20" />
        </button>

        <div className="flex gap-10">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8 text-white" />
            ) : (
              <Menu className="w-8 h-8 text-white" />
            )}
          </button>
          <img
            className="w-[50px] h-[50px] cursor-pointer rounded-full object-cover"
            src={useImageUrl ? useImageUrl : loginIcon}
            alt="로그인아이콘썸네일"
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-4 flex flex-col space-y-2">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              className="text-white bg-gray-700 p-2 rounded flex-1"
              type="text"
              placeholder="검색"
              onChange={(e) => setSearch(e.target.value)}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
            <button type="submit" className="text-white p-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          {!userInfo?.user ? (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              로그인
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 text-left"
            >
              로그아웃
            </button>
          )}
          {!!userInfo?.user && (
            <Link
              to="/mypage/favorite"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              즐겨찾기
            </Link>
          )}
          {!!userInfo?.user && (
            <Link
              to="/mypage"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              마이페이지
            </Link>
          )}
          {!userInfo?.user && (
            <Link
              to="/signup"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              회원가입
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
