import { useParams } from "react-router-dom";
import { useMovieDetail } from "../store";
import { useEffect, useState } from "react";
import SkeletonMovieDetail from "../component/SkeletonMovieDetail";

export default function MovieDetail() {
  const { id } = useParams();
  const { movieDetail, fetchMovieDetail } = useMovieDetail();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // 데이터 받기 전 loading 상태
    fetchMovieDetail(id);
  }, [id, fetchMovieDetail]);

  useEffect(() => {
    if (movieDetail) {
      setIsLoading(false); //데이터 받은 후 loading 상태 해제
    }
  }, [movieDetail]);

  {
    if (isLoading || !movieDetail || Number(id) !== movieDetail.id) {
      return <SkeletonMovieDetail />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative">
            <img
              className="w-full h-[300px] md:h-[500px] object-cover"
              src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
            />
            <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-lg">
              ⭐ {movieDetail.vote_average?.toFixed(1)}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {movieDetail.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                개봉일: {movieDetail.release_date}
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                러닝타임: {movieDetail.runtime}분
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                줄거리
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {movieDetail.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
