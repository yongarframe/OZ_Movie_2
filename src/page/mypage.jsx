import { useState, useEffect } from "react";
import "../App.css";
import { useSupabaseAuth } from "../supabase";
import { useIsUserLogin, useUserInfo } from "../store";

function MyPage() {
  // const [userInfo, setUserInfo] = useState("");
  const { setIsLogin } = useIsUserLogin();
  const { userInfo, setUserInfo } = useUserInfo();
  const { logout } = useSupabaseAuth();

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const userInfo = await getUserInfo();
  //     setUserInfo(userInfo.user);
  //   };
  //   fetchUserInfo();
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo("");
      // 로그아웃 후 처리 로직 추가 가능
      console.log("로그아웃 성공");
      setIsLogin(false);
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
    }
  };

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
        <button
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          로그아웃
        </button>
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
          <li>작성한 게시글</li>
          <li>댓글 목록</li>
          <li>좋아요 목록</li>
        </ul>
      </div>
    </div>
  );
}

export default MyPage;
