import SkeletonSlider from '@/component/skeletonUI/SkeletonSlider'
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
  if (!slideMovieData.length) return <SkeletonSlider />

  return (
    <div className="overflow-hidden text-white">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {slideMovieData.map(({ id, backdrop_path, title, overview }, index) => (
          <div
            className="w-full flex-shrink-0 h-[500px] object-cover relative cursor-pointer"
            key={backdrop_path}
            onClick={() => navigate(`/movie/${id}`)}
          >
            {!loaded[index] && <SkeletonSlider />}
            <img
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="relative z-20 max-w-[1200px] mx-auto px-4 h-full flex flex-col justify-end pb-5">
              <h1 className="text-3xl md:text-4xl font-bold max-w-2xl">
                {title}
              </h1>
              <p className="mt-4 text-white/80 max-w-3xl line-clamp-4">
                {overview}
              </p>
            </div>
          </div>
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
