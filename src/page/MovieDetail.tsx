import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SkeletonMovieDetail from '../component/skeletonUI/SkeletonMovieDetail'
import ScrollToTop from '@/component/ScrollToTop'
import formatMinute from '@/util/formatMinute'
import CommentList from '@/component/CommentList'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'
import { useMovieDetailData } from '@/hooks/useMovieDetailData'
import { useMovieDetail } from '@/hooks/queries/useMovieDetail'

export default function MovieDetail() {
  const user = useSupabaseUser()
  const { id: movieId } = useParams()
  // const { movieDetail, fetchMovieDetail, isLoading } = useMovieDetail()

  const { data: movieDetail, isPending: isLoading } = useMovieDetail(
    movieId ?? ''
  )

  const [scrollYPosition, setScrollYPosition] = useState(0)
  const scrollRef = useRef(null)
  const { cast, director, rating } = useMovieDetailData(movieId)

  // useEffect(() => {
  //   if (movieId) fetchMovieDetail(movieId)
  // }, [movieId, fetchMovieDetail])

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
          className="flex justify-end w-full sticky top-[80px] overflow-hidden z-1 px-0 lg:px-20 "
          ref={scrollRef}
          style={{ opacity: opacity }}
        >
          <img
            className="w-[1200px] h-[300px] sm:h-[400px] md:h-[600px] object-cover transition-opacity duration-300 mask-left-right-bottom"
            src={`https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}`}
            alt={title}
          />
        </div>

        {/* 콘텐츠 */}
        <div className="relative left-0 z-10 w-full -mt-[80px] sm:-mt-[150px] md:-mt-[300px]">
          <div className="p-4 sm:p-8 md:px-20 max-w-[875px]">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {title}
            </h1>
            <p className="text-gray-400 text-base sm:text-[18px] mt-4 leading-relaxed">
              {overview}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4 text-gray-400 sm:gap-4">
              <div className="w-[30px] bg-amber-600 text-center rounded-md font-bold text-white">
                {rating || '-'}
              </div>
              <div>{release_date}</div>
              <div>{formatMinute(runtime)}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 text-gray-400">
              {genres}
            </div>
          </div>

          {/* 상세정보 섹션 */}
          <section className="px-4 mt-10 sm:mt-20 sm:px-8 md:px-20">
            <div>
              <div className="pb-4 text-xl font-bold text-white sm:text-2xl">
                상세정보
              </div>
              <hr className="mt-3 text-white border" />
              <h1 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                {movieDetail.title}*
              </h1>
            </div>
            <div className="flex gap-8 mt-6 flex-col-1050">
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
              <div className="flex flex-col gap-4 text-white">
                <div className="flex flex-col gap-1">
                  <span>감독:</span>
                  <span>{director?.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>출연:</span>
                  <ul className="flex gap-4 pb-2 overflow-x-auto">
                    {cast.map((actor) => (
                      <li
                        key={actor.id}
                        className="w-20 text-center sm:w-28 shrink-0"
                      >
                        {actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full mb-2 rounded-lg"
                          />
                        )}
                        <p className="text-xs font-medium sm:text-sm">
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
