import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SkeletonMovieDetail from '../component/skeletonUI/SkeletonMovieDetail'
import { useMovieDetail } from '@/store/useMovieDetail'
import { api } from '@/API/mainApi'
import ScrollToTop from '@/component/ScrollToTop'
import type { MovieReleaseData } from '@/types/MovieReleaseData'
import type { Cast, Crew } from '@/types/movieDetail'
import formatMinute from '@/util/formatMinute'
import CommentList from '@/component/CommentList'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'

export default function MovieDetail() {
  const user = useSupabaseUser()
  const { id: movieId } = useParams()
  const { movieDetail, fetchMovieDetail } = useMovieDetail()
  const [isLoading, setIsLoading] = useState(true)
  const [scrollYPosition, setScrollYPosition] = useState(0)
  const [movieReleaseData, setMovieReleaseData] =
    useState<MovieReleaseData | null>(null)
  const [rating, setRating] = useState('')
  const [cast, setCast] = useState<Cast[]>([])
  const [director, setDirector] = useState<Crew | null>(null)
  const scrollRef = useRef(null)

  const fetchMovieRelease = async () => {
    const { data } = await api.get(`/${movieId}/release_dates`)
    setMovieReleaseData(data)
  }
  const fetchCredits = async () => {
    try {
      const { data } = await api.get(`${movieId}/credits?language=ko-KR`)
      setCast(data.cast.slice(0, 5)) // 상위 5명만
      const directorData = data.crew.find((c: Crew) => c.job === 'Director')
      setDirector(directorData || null)
    } catch {
      void 0
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [movieId])

  useEffect(() => {
    if (movieReleaseData) {
      const krRelease = movieReleaseData.results.find(
        (r) => r.iso_3166_1 === 'KR'
      )?.release_dates[0]
      if (krRelease) setRating(krRelease?.certification)
    }
  }, [movieId, movieReleaseData])

  useEffect(() => {
    fetchMovieRelease()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (movieId) fetchMovieDetail(movieId)
  }, [movieId, fetchMovieDetail])

  useEffect(() => {
    if (movieDetail) {
      setIsLoading(false)
    }
  }, [movieDetail])

  const handleScroll = () => {
    const currentY = window.pageYOffset
    setScrollYPosition(currentY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const opacity = Math.max(0.35, 1 - scrollYPosition / 200)

  if (isLoading || !movieDetail || Number(movieId) !== movieDetail.id) {
    return <SkeletonMovieDetail />
  }

  const genres = movieDetail.genres.map((genres) => genres.name).join(', ')
  const { title, overview, runtime, release_date } = movieDetail

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        {/* 배경 이미지 */}
        <div
          className="flex justify-end w-full sticky top-0 overflow-hidden z-1"
          ref={scrollRef}
          style={{ opacity: opacity }}
        >
          <img
            className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover transition-opacity duration-300 mask-left-bottom"
            src={`https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}`}
            alt={title}
          />
        </div>

        {/* 콘텐츠 */}
        <div className="relative left-0 z-10 w-full -mt-[80px] sm:-mt-[150px] md:-mt-[300px]">
          <div className="p-4 sm:p-8 md:px-20 max-w-[875px]">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              {title}
            </h1>
            <p className="text-gray-400 text-base sm:text-[18px] mt-4 leading-relaxed">
              {overview}
            </p>
            <div className="text-gray-400 flex flex-wrap gap-2 sm:gap-4 mt-4 items-center">
              <div className="w-[30px] bg-amber-600 text-center rounded-md font-bold text-white">
                {rating || '-'}
              </div>
              <div>{release_date}</div>
              <div>{formatMinute(runtime)}</div>
            </div>
            <div className="flex flex-wrap gap-2 text-gray-400 mt-4">
              {genres}
            </div>
          </div>

          {/* 상세정보 섹션 */}
          <section className="mt-10 sm:mt-20 px-4 sm:px-8 md:px-20">
            <div>
              <div className="text-xl sm:text-2xl text-white pb-4 font-bold">
                상세정보
              </div>
              <hr className="border text-white mt-3" />
              <h1 className="text-white text-xl sm:text-2xl font-bold mt-3">
                {movieDetail.title}*
              </h1>
            </div>
            <div className="flex flex-col-1050 gap-8 mt-6">
              {/* 왼쪽 정보 */}
              <div className="flex flex-col w-full md:w-[400px] text-white gap-4">
                <div className="flex flex-col gap-1">
                  <span>러닝타임:</span>
                  <span>{formatMinute(runtime)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>공개일:</span>
                  <span>{release_date}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>장르:</span>
                  <span className="flex flex-wrap gap-1">{genres}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>관람등급:</span>
                  <span className="w-[30px] bg-amber-600 text-center rounded-md font-bold text-white">
                    {rating || '-'}
                  </span>
                </div>
              </div>

              {/* 오른쪽 감독/출연 */}
              <div className="flex flex-col text-white gap-4">
                <div className="flex flex-col gap-1">
                  <span>감독:</span>
                  <span>{director?.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>출연:</span>
                  <ul className="flex gap-4 overflow-x-auto pb-2">
                    {cast.map((actor) => (
                      <li
                        key={actor.id}
                        className="w-20 sm:w-28 text-center shrink-0"
                      >
                        {actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="rounded-lg mb-2 w-full"
                          />
                        )}
                        <p className="text-xs sm:text-sm font-medium">
                          {actor.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {actor.character}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <CommentList postId={movieId || ''} userId={user?.id || ''} />
        </div>
      </div>
    </>
  )
}
