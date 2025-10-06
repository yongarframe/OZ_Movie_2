import { Link, useNavigate } from 'react-router-dom'
import { useSupabaseAuth } from '../supabase'
import loginIcon from '@/assets/loginicon.png'
import { useIsUserLogin } from '@/store/useIsUserLogin'
import type { UserInfo } from '@/types/userInfo'
import mainLogo from '@/assets/main-logo.png'
import useSearchEnter from '@/hooks/useSearchEnter'

export default function NavbarPcView({
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
  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsLogin(false)
    setUserInfo(null)
  }
  const handleSearch = () => {
    if (!search.trim()) return
    navigate(`/search?movie=${search}`)
  }

  const { searchEnterKeyDown, handleCompositionStart, handleCompositionEnd } =
    useSearchEnter(handleSearch)

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-4 flex items-center justify-between">
        <button
          className="text-white text-2xl font-bold tracking-tight cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          <img
            src={mainLogo}
            alt="mainLogo"
            className="h-20"
            width={80}
            height={80}
          />
        </button>

        <div className="flex-1 hidden md:flex items-center justify-center px-4">
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 w-full max-w-[600px]">
            <input
              className="flex-1 text-black placeholder-black/60 bg-transparent outline-none min-w-[150px]"
              type="text"
              placeholder="Search movies......."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchEnterKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
          </div>
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {!userInfo || !!userInfo.error ? (
            <Link to="/login" className="text-white hover:opacity-80">
              Login/Signup
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:opacity-80 cursor-pointer"
            >
              로그아웃
            </button>
          )}

          {!!userInfo?.user && (
            <Link to="/mypage/favorite" className="text-white hover:opacity-80">
              즐겨찾기
            </Link>
          )}
          {!!userInfo?.user && (
            <Link to="/mypage" className="text-white hover:opacity-80">
              마이페이지
            </Link>
          )}
          {(!userInfo || !!userInfo.error) && (
            <Link to="/signup" className="text-white hover:opacity-80">
              회원가입
            </Link>
          )}

          <img
            className="w-[40px] h-[40px] cursor-pointer rounded-full object-cover"
            src={useImageUrl ? useImageUrl : loginIcon}
            alt="로그인아이콘썸네일"
          />
        </div>
      </div>
    </nav>
  )
}
