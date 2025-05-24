// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
import { useSupabaseAuth } from "../supabase";
import { delay } from "../util/delay";

export default function Login() {
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const { loginWithGoogle } = useSupabaseAuth();

  const handleNaverLogin = () => {
    // 네이버 로그인 처리
    console.log("네이버 로그인");
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 처리
    console.log("카카오 로그인");
  };

  const handleGoogleLogin = async () => {
    // 구글 로그인 처리
    try {
      const { data, error } = await loginWithGoogle();

      if (error) throw error;

      // 로그인 성공 시 처리
      console.log("구글 로그인 성공:", data);
    } catch (error) {
      console.error("구글 로그인 실패:", error.message);
    }
  };

  // useEffect(() => {
  //   const authorizationCode = searchParams.get("code");
  //   console.log(authorizationCode);
  //   getGoogleUserInfo(authorizationCode);
  // }, []);

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div className="social-login-buttons">
        <button className="login-button naver" onClick={handleNaverLogin}>
          네이버로 로그인
        </button>
        <button className="login-button kakao" onClick={handleKakaoLogin}>
          카카오로 로그인
        </button>
        <button className="login-button google" onClick={handleGoogleLogin}>
          구글로 로그인
        </button>
      </div>
    </div>
  );
}
