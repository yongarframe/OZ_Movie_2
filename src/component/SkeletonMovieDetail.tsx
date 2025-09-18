// src/component/SkeletonMovieDetail.tsx
export default function SkeletonMovieDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse">
      {/* 백드롭 이미지 영역 */}
      <div className="flex justify-end w-full sticky top-0 overflow-hidden z-0 pl-20">
        <div className="w-full h-[500px] bg-gray-700"></div>
      </div>

      {/* 텍스트 영역 */}
      <div className="absolute top-[120px] left-0 z-10 w-full">
        <div className="p-8 pt-[0px] px-20 max-w-[875px] mt-[300px]">
          {/* 제목 */}
          <div className="h-8 w-2/3 bg-gray-700 rounded"></div>

          {/* 줄거리 */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-700 rounded"></div>
          </div>

          {/* 평점/날짜/러닝타임 */}
          <div className="flex gap-4 mt-4">
            <div className="w-[30px] h-[30px] bg-gray-700 rounded-md"></div>
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-700 rounded"></div>
          </div>

          {/* 장르 */}
          <div className="flex gap-2 mt-4">
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
            <div className="h-4 w-10 bg-gray-700 rounded"></div>
            <div className="h-4 w-14 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* 상세정보 섹션 */}
        <section className="mt-20 px-20">
          <div>
            <div className="h-6 w-32 bg-gray-700 rounded"></div>
            <hr className="border-gray-700 mt-3" />
            <div className="h-6 w-40 bg-gray-700 rounded mt-3"></div>
          </div>

          <div className="flex mt-6 gap-10">
            {/* 왼쪽 정보 */}
            <div className="flex flex-col w-[400px] text-white gap-4">
              <div className="h-4 w-28 bg-gray-700 rounded"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
              <div className="h-4 w-20 bg-gray-700 rounded"></div>
              <div className="h-6 w-[30px] bg-gray-700 rounded-md"></div>
            </div>

            {/* 감독/출연 */}
            <div className="flex flex-col gap-4">
              <div className="h-4 w-20 bg-gray-700 rounded"></div>
              <ul className="flex gap-4 overflow-x-auto">
                {Array(5)
                  .fill(null)
                  .map((_, idx) => (
                    <li
                      key={idx}
                      className="w-28 flex flex-col items-center gap-2"
                    >
                      <div className="w-24 h-32 bg-gray-700 rounded-lg"></div>
                      <div className="h-4 w-16 bg-gray-700 rounded"></div>
                      <div className="h-3 w-12 bg-gray-700 rounded"></div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
