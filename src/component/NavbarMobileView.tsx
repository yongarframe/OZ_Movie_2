import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSupabaseAuth } from '../supabase'
import loginIcon from '@/assets/loginicon.png'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import type { UserInfo } from '@/types/userInfo'
import mainLogo from '@/assets/main-logo.png'
import { Menu, X } from 'lucide-react'

export default function NavbarMobileView({
  setSearch,
  userInfo,
  useImageUrl,
  setUserInfo,
}: {
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

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <button
          className="text-xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          <img src={mainLogo} className="h-20" />
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
          <input
            className="text-white bg-gray-700 p-2 rounded"
            type="text"
            placeholder="검색"
            onChange={(e) => setSearch(e.target.value)}
          />
          {!userInfo ? (
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
          {!!userInfo && (
            <Link
              to="/mypage/favorite"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              즐겨찾기
            </Link>
          )}
          {!!userInfo && (
            <Link
              to="/mypage"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
            >
              마이페이지
            </Link>
          )}
          {!userInfo && (
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
