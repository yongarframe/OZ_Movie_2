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
    } catch (_error: unknown) {
      void 0
    }
  }

  return (
    <div className="mypage-container">
      <div className="flex flex-col items-center justify-center">
        <img
          src={userInfo?.user?.profileImageUrl}
          alt="프로필 이미지"
          className="profile-image"
        />
        <h2>{userInfo?.user?.userName}</h2>
        <p>{userInfo?.user?.email}</p>
        {!!userInfo && (
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>

      <div className="menu-section">
        <h3>내 정보</h3>
        <ul className="menu-list">
          <li>개인정보 수정</li>
          <li>비밀번호 변경</li>
          <li>알림 설정</li>
        </ul>

        <h3>활동 내역</h3>
        <ul className="menu-list">
          <li onClick={() => navigate(`/mypage/favorite`)}>
            영화 즐겨찾기 목록
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPage
