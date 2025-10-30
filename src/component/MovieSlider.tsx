import SkeletonSlider from '@/component/skeletonUI/SkeletonSlider'
import useSliderDrag from '@/hooks/useSliderDrag'
import type { MovieData } from '@/types/MovieData'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MovieSlider({
  slideMovieData,
}: {
  slideMovieData: MovieData[]
}) {
  const slideLength = slideMovieData.length
  const [currentImg, setCurrentImg] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(
    Array(slideLength).fill(false)
  )
  const navigate = useNavigate()
  const { handleStart, handleMove, handleEnd, sliderRef, movedDistance } =
    useSliderDrag(currentImg, setCurrentImg, slideLength)

  useEffect(() => {
    setLoaded(Array(slideMovieData.length).fill(false))
  }, [slideMovieData])

  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? slideLength - 1 : currentImg - 1)
  }
  const nextSlide = () => {
    setCurrentImg(currentImg === slideLength - 1 ? 0 : currentImg + 1)
  }

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }
  const handleClick = (id: number) => {
    if (movedDistance.current < 5) {
      navigate(`/movie/${id}`)
    }
  }

  if (!slideMovieData.length) return <SkeletonSlider />

  return (
    <div
      className="overflow-hidden text-white select-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
    >
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {slideMovieData.map(({ id, backdrop_path, title, overview }, index) => (
          <div
            className="w-full flex-shrink-0 h-[600px] object-cover relative cursor-pointer"
            key={backdrop_path}
            onClick={() => handleClick(id)}
          >
            <div className="absolute inset-0">
              {!loaded[index] && <SkeletonSlider />}
              <img
                className="absolute inset-0 z-0 object-cover w-full h-full"
                src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                alt={`${title}의 슬라이드 이미지`}
                onLoad={() => handleImageLoad(index)}
                width={1280}
                height={600}
                fetchPriority={index === 0 ? 'high' : 'auto'} // 첫 번째 이미지 우선 fetch(LCP 개선)
              />
            </div>
            <div className="absolute inset-0 z-10 bg-black/30" />
            <div className="relative z-20 max-w-[1200px] mx-auto px-4 h-full flex flex-col justify-end pb-5">
              <h1 className="max-w-2xl text-3xl font-bold md:text-4xl">
                {title}
              </h1>
              <p className="max-w-3xl mt-4 text-white/80 line-clamp-4">
                {overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 text-white text-[3em] cursor-pointer left-3"
      >
        ‹
      </button>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 text-white text-[3em] cursor-pointer right-3"
      >
        ›
      </button>
      <div className="flex justify-center gap-5 mt-2">
        {slideMovieData.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentImg
                ? 'bg-amber-300 dark:bg-gray-300'
                : 'bg-gray-200 dark:bg-gray-500'
            }`}
            onClick={() => setCurrentImg(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}
