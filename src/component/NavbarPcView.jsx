import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { useIsUserLogin } from "../store";
import loginIcon from "../assets/loginicon.png";

export default function NavbarPcView({
  setSearch,
  isLogin,
  useImageUrl,
  setUserInfo,
}) {
  const navigate = useNavigate();
  const { logout } = useSupabaseAuth();
  const { setIsLogin } = useIsUserLogin();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsLogin(false);
    setUserInfo("");
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center space-x-4">
        <button
          className="text-2xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          🎬 OZ무비
        </button>
        <div className="flex items-center space-x-4 gap-4 border-2 border-gray-700 rounded-md p-2 bg-gray-700 ">
          <input
            className="text-white bg-gray-700 rounded-md px-3 py-2 w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="검색"
            onChange={(e) => setSearch(e.target.value)}
          />
          {!isLogin ? (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 cursor-pointer transition-all duration-300"
            >
              로그인
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 cursor-pointer transition-all duration-300"
            >
              로그아웃
            </button>
          )}
          <Link
            to="/mypage"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 cursor-pointer transition-all duration-300"
          >
            마이페이지
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md bg-gray-700 cursor-pointer transition-all duration-300"
          >
            회원가입
          </Link>
          <img
            className="w-[50px] h-[50px] cursor-pointer rounded-full object-cover"
            src={useImageUrl ? useImageUrl : loginIcon}
            alt="로그인아이콘썸네일"
          />
        </div>
      </div>
    </nav>
  );
}
