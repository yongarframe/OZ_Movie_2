import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SkeletonMovieDetail from '../component/SkeletonMovieDetail'
import { useMovieDetail } from '@/store/useMovieDetail'
import { api } from '@/API/mainApi'
import ScrollToTop from '@/component/ScrollToTop'
import type { MovieReleaseData } from '@/types/MovieReleaseData'
import type { Cast, Crew } from '@/types/movieDetail'

export default function MovieDetail() {
  const { id: movieId } = useParams()
  const { movieDetail, fetchMovieDetail } = useMovieDetail()
  const [isLoading, setIsLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [movieReleaseData, setMovieReleaseData] =
    useState<MovieReleaseData | null>(null)
  const [rating, setRating] = useState('')
  const [cast, setCast] = useState<Cast[]>([])
  const [director, setDirector] = useState<Crew | null>(null)

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
      // console.error('감독/출연진 불러오기 실패:', err)
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

  // Intersection Observer를 사용하여 스크롤 위치를 감지할 ref
  const scrollRef = useRef(null)

  // 영화 상세 정보를 불러오는 훅
  useEffect(() => {
    setIsLoading(true)
    if (movieId) fetchMovieDetail(movieId)
  }, [movieId, fetchMovieDetail])

  // 영화 상세 정보 로딩 상태 관리
  useEffect(() => {
    if (movieDetail) {
      setIsLoading(false)
    }
  }, [movieDetail])

  // 스크롤 위치를 추적하여 투명도 계산
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const opacity = Math.max(0.35, 1 - scrollPosition / 200)

  if (isLoading || !movieDetail || Number(movieId) !== movieDetail.id) {
    return <SkeletonMovieDetail />
  }

  const genres = movieDetail.genres.map((genres) => genres.name).join(', ')
  const { title, overview, runtime, release_date } = movieDetail

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div
          className="flex justify-end w-full sticky top-0 overflow-hidden z-0 pl-20"
          ref={scrollRef}
          style={{ opacity: opacity }}
        >
          <img
            className="w-full object-cover transition-opacity duration-300 mask-left-bottom"
            src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
            alt={title}
          />
        </div>
        <div className="absolute top-[120px] left-0 z-10 w-full">
          <div className=" p-8 pt-[0px] px-20 max-w-[875px] mt-[300px]">
            <h1 className="text-white text-3xl font-bold">{title}</h1>
            <p className="text-gray-400 text-[18px] mt-4">{overview}</p>
            <div className="text-gray-400 flex gap-4 mt-4">
              <div className="w-[30px] bg-amber-600 text-center rounded-md font-bold text-white">
                {rating || '-'}
              </div>
              <div>{release_date}</div>
              <div>{runtime}</div>
            </div>
            <div className="flex gap-2 text-gray-400 mt-4">{genres}</div>
          </div>
          <section className="mt-20 px-20">
            <div>
              <div className="text-2xl text-white pb-4">상세정보</div>
              <hr className="border text-white mt-3" />
              <h1 className="text-white text-2xl font-bold mt-3">
                {movieDetail.title}*
              </h1>
            </div>
            <div className="flex">
              <div className="flex flex-col w-[400px] text-white gap-4">
                <div className="flex flex-col gap-1">
                  <span>러닝타임:</span>
                  <span>{runtime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>공개일:</span>
                  <span>{release_date}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>장르:</span>
                  <span className="flex gap-1">{genres}</span>
                </div>
                <div className="flex flex-col w-[400px] gap-2">
                  <span>관람등급:</span>
                  <span className="w-[30px] bg-amber-600 text-center rounded-md font-bold text-white">
                    {rating || '-'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-white gap-4">
                <div className="flex flex-col gap-1">
                  <span>감독:</span>
                  <span>{director?.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>출연:</span>
                  <ul className="flex gap-4 overflow-x-auto">
                    {cast.map((actor) => (
                      <li key={actor.id} className="w-28 text-center">
                        {actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="rounded-lg mb-2"
                          />
                        )}
                        <p className="text-sm font-medium">{actor.name}</p>
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
        </div>
        <div className="h-[1000px]"></div>
      </div>
    </>
  )
}
