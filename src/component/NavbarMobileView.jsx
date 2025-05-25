import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSupabaseAuth } from "../supabase";
import { useIsUserLogin } from "../store";
import loginIcon from "../assets/loginicon.png";

export default function NavbarMobileView({
  setSearch,
  isLogin,
  useImageUrl,
  setUserInfo,
}) {
  const navigate = useNavigate();
  const { logout } = useSupabaseAuth();
  const { setIsLogin } = useIsUserLogin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsLogin(false);
    setUserInfo("");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <button
          className="text-xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          🎬 OZ무비
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
        <img
          className="w-[50px] h-[50px] cursor-pointer rounded-full object-cover"
          src={useImageUrl ? useImageUrl : loginIcon}
          alt="로그인아이콘썸네일"
        />
      </div>

      {isMenuOpen && (
        <div className="mt-4 flex flex-col space-y-2">
          <input
            className="text-white bg-gray-700 p-2 rounded"
            type="text"
            placeholder="검색"
            onChange={(e) => setSearch(e.target.value)}
          />
          {!isLogin ? (
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
          <Link
            to="/mypage"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
          >
            마이페이지
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700"
          >
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}
