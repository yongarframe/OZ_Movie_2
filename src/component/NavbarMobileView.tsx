import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSupabaseAuth } from '../supabase'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import type { UserInfo } from '@/types/userInfo'
import mainLogo from '@/assets/main-logo.png'
import { ChevronDown, Menu, X } from 'lucide-react'
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
  setUserInfo,
  genres,
}: {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  userInfo: UserInfo | null
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-4 text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            <img src={mainLogo} alt="mainLogo" className="h-12" />
            <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
              필름잇다
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white cursor-pointer z-60 focus:outline-none"
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
              className="fixed inset-0 z-50 bg-black"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-64 h-full p-4 pt-20 bg-gray-800"
            >
              <div className="flex flex-col mt-4 space-y-2">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <input
                    className="flex-1 p-2 text-white bg-gray-700 rounded"
                    type="text"
                    placeholder="검색"
                    onChange={(e) => setSearch(e.target.value)}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                  />
                  <button
                    type="submit"
                    className="p-2 text-white cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
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
                    className="flex items-center justify-between w-full px-3 py-2 text-left text-white transition-colors bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
                  >
                    <span>장르별</span>
                    <motion.div
                      animate={{ rotate: isGenresOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isGenresOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 overflow-y-auto origin-top-right bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48 hide-scrollbar"
                      >
                        <div className="py-1">
                          {genres.map((genre) => (
                            <Link
                              key={genre.id}
                              to={`/genre/${genre.id}`}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-gray-300 text-m hover:bg-gray-600 hover:text-white"
                            >
                              {genre.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!userInfo?.user ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-white bg-gray-700 rounded-md hover:text-gray-300"
                  >
                    로그인
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="px-3 py-2 text-left text-red-500 bg-gray-700 rounded-md hover:text-gray-300"
                  >
                    로그아웃
                  </button>
                )}
                {!!userInfo?.user && (
                  <Link
                    to="/mypage/favorite"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-white bg-gray-700 rounded-md hover:text-gray-300"
                  >
                    즐겨찾기
                  </Link>
                )}
                {!!userInfo?.user && (
                  <Link
                    to="/mypage"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-white bg-gray-700 rounded-md hover:text-gray-300"
                  >
                    마이페이지
                  </Link>
                )}
                {!userInfo?.user && (
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-white bg-gray-700 rounded-md hover:text-gray-300"
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
