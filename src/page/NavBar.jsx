import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../customHooks/useDebounce";

export default function NavBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 1000);

  useEffect(() => {
    if (debounceValue) {
      navigate(`/search?movie=${debounceValue}`);
    } else {
      navigate(`/`);
    }
  }, [debounceValue]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-end space-x-4">
        <button
          className="text-2xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate(`/`)}
        >
          🎬 OZ무비
        </button>
        <input
          className="text-white"
          type="text"
          placeholder="검색"
          onChange={(e) => setSearch(e.target.value)}
        />
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
