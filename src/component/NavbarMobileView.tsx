import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSupabaseAuth } from '../supabase'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import type { UserInfo } from '@/types/userInfo'
import mainLogo from '@/assets/main-logo.png'
import { Menu, X } from 'lucide-react'
import useSearchEnter from '@/hooks/useSearchEnter'
import { motion, AnimatePresence } from 'framer-motion'

interface Genre {
  id: number
  name: string
}

export default function NavbarMobileView({
  search,
  setSearch,
  userInfo,
  useImageUrl,
  setUserInfo,
  genres,
}: {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  userInfo: UserInfo | null
  useImageUrl: string | undefined
  setUserInfo: (userInfo: UserInfo | null) => void
  genres: Genre[]
}) {
  const navigate = useNavigate()
  const { logout } = useSupabaseAuth()
  const { setIsLogin } = useIsUserLogin()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGenresOpen, setIsGenresOpen] = useState(false)

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
    setIsMenuOpen(false)
  }

  const { handleCompositionStart, handleCompositionEnd } =
    useSearchEnter(handleSearch)

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            className="text-xl font-bold cursor-pointer text-blue-600 flex items-center gap-4"
            onClick={() => navigate(`/`)}
          >
            <img src={mainLogo} alt="mainLogo" className="h-12" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              필름잇다
            </span>
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none cursor-pointer z-50"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8 text-white" />
            ) : (
              <Menu className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 p-4 pt-20"
            >
              <div className="mt-4 flex flex-col space-y-2">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <input
                    className="text-white bg-gray-700 p-2 rounded flex-1"
                    type="text"
                    placeholder="검색"
                    onChange={(e) => setSearch(e.target.value)}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                  />
                  <button
                    type="submit"
                    className="text-white p-2 cursor-pointer"
                  >
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
                <div className="relative">
                  <button
                    onClick={() => setIsGenresOpen((prev) => !prev)}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 w-full text-left"
                  >
                    장르별
                  </button>
                  {isGenresOpen && (
                    <div className="mt-2 flex flex-col space-y-2">
                      {genres.map((genre) => (
                        <Link
                          key={genre.id}
                          to={`/genre/${genre.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-600"
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {!userInfo?.user ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
                  >
                    로그인
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-red-500 hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 text-left"
                  >
                    로그아웃
                  </button>
                )}
                {!!userInfo?.user && (
                  <Link
                    to="/mypage/favorite"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
                  >
                    즐겨찾기
                  </Link>
                )}
                {!!userInfo?.user && (
                  <Link
                    to="/mypage"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
                  >
                    마이페이지
                  </Link>
                )}
                {!userInfo?.user && (
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
                  >
                    회원가입
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
