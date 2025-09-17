import { useCallback, useEffect, useState } from 'react'
import MovieCard from '../component/MovieCard'
import { useMovieData } from '@/store/useMovieData'
import type { MovieData } from '@/types/MovieData'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'

const SLIDE_IMAGE_COUNT = 4

export default function MovieCardRender({
  movieData,
}: {
  movieData: MovieData[]
}) {
  const fetchMovieData = useMovieData((state) => state.fetchMovieData)
  const slideMovieData = movieData.slice(0, SLIDE_IMAGE_COUNT)
  const [currentImg, setCurrentImg] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const user = useSupabaseUser()

  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setLoading(true)
            await fetchMovieData(page + 1)
            setPage((prev) => prev + 1)
            setLoading(false)
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(node)

      return () => {
        if (observer && node) observer.unobserve(node)
      }
    },
    [page, loading]
  )

  useEffect(() => {
    if (movieData.length === 0) {
      fetchMovieData(page)
    }
  }, [])

  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? SLIDE_IMAGE_COUNT - 1 : currentImg - 1)
  }
  const nextSlide = () => {
    setCurrentImg(currentImg === SLIDE_IMAGE_COUNT - 1 ? 0 : currentImg + 1)
  }

  if (!Array.isArray(slideMovieData) || slideMovieData.length <= 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {slideMovieData.map(({ backdrop_path, title, overview }) => (
          <div
            className="w-full flex-shrink-0 h-[500px] object-cover relative"
            key={backdrop_path}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            />
            <div className="relative z-10 max-w-[1200px] mx-auto px-4 h-full flex flex-col justify-end pb-5">
              <h1 className="text-3xl md:text-4xl font-bold max-w-2xl">
                {title}
              </h1>
              <p className="mt-4 text-white/80 max-w-3xl line-clamp-4">
                {overview}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button className="bg-[var(--brand-red)] text-white px-6 py-3 rounded-md font-semibold">
                  Watch Now
                </button>
                <button className="border border-white/40 text-white px-6 py-3 rounded-md font-semibold">
                  Watch Later
                </button>
              </div>
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
      <div className="flex justify-center gap-2 mt-2">
        {slideMovieData.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentImg
                ? 'bg-amber-300 dark:bg-gray-300'
                : 'bg-gray-200 dark:bg-gray-500'
            }`}
          ></span>
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Trending</h2>
          <button className="text-white/80 hover:text-white">View all</button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <MovieCard
              key={`${movie.id}${movie.title}`}
              {...movie}
              userId={user?.id}
            />
          ))}
        </div>
      </div>
      {movieData.length > 0 && <div ref={observerRef}></div>}
    </div>
  )
}
