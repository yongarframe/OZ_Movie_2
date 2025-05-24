import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-end space-x-4">
        <button
          className="text-2xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          🎬 OZ무비
        </button>
        <Link
          to="/login"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md"
        >
          로그인
        </Link>
        <Link
          to="/mypage"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md"
        >
          마이페이지
        </Link>
      </div>
    </nav>
  );
}
