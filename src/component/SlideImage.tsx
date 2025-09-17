import { useEffect, useState } from 'react'

export default function SlideImage({
  slideMovieData,
}: {
  slideMovieData: string[]
}) {
  const [currentImg, setCurrentImg] = useState(0)

  const length = slideMovieData.length

  // 버튼 클릭시 이전 / 다음 이미지를 보여줌
  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1)
  }
  const nextSlide = () => {
    setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1)
  }

  // 3초마다 작동하는 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval) //
  }, [currentImg])

  // 이미지가 없을 때
  if (!Array.isArray(slideMovieData) || slideMovieData.length <= 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden w-full mx-auto">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {slideMovieData.map((path) => (
          <img
            src={`https://image.tmdb.org/t/p/w780${path}`}
            alt="슬라이드 이미지"
            className="w-full flex-shrink-0 h-[px] object-cover"
            key={path}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 text-white text-[3em] cursor-pointer left-3"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 text-white text-[3em] cursor-pointer right-3"
      >
        ›
      </button>
      <div className="flex justify-center gap-2 mt-2">
        {slideMovieData.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentImg
                ? 'bg-black dark:bg-gray-300'
                : 'bg-gray-200 dark:bg-gray-500'
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}
