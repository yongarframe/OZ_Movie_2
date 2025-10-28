import { useIsUserLogin } from '@/store/useIsUserLogin'
import '../App.css'
import { useSupabaseAuth } from '../supabase'
import { useUserInfo } from '@/store/useUserInfo'
import { useNavigate } from 'react-router-dom'

function MyPage() {
  const { setIsLogin } = useIsUserLogin()
  const { userInfo, setUserInfo } = useUserInfo()
  const { logout } = useSupabaseAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      setUserInfo(null)
      setIsLogin(false)
    } catch {
      void 0
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-5 text-white">
      <div className="flex flex-col items-center justify-center mb-10 rounded-lg bg-gray-800 p-6">
        <img
          src={userInfo?.user?.profileImageUrl}
          alt="프로필 이미지"
          className="w-36 h-36 rounded-full mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2">{userInfo?.user?.userName}</h2>
        <p className="text-gray-400 mb-4">{userInfo?.user?.email}</p>
        {!!userInfo && (
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>

      <div className="space-y-10">
        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
            내 정보
          </h3>
          <ul className="space-y-2">
            <li className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors">
              개인정보 수정
            </li>
            <li className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors">
              비밀번호 변경
            </li>
            <li className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors">
              알림 설정
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
            활동 내역
          </h3>
          <ul className="space-y-2">
            <li
              onClick={() => navigate(`/mypage/favorite`)}
              className="p-3 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors"
            >
              영화 즐겨찾기 목록
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyPage
