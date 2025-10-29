import { useInView } from 'react-intersection-observer'
import {
  usePopular,
  useNowPlaying,
  useTopRated,
  useUpcoming,
} from '@/store/useMovieCategories'
import type { MovieRowsType } from '@/types/MovieRowsType'
import MovieCard from '@/component/MovieCard'
import SkeletonMovieCard from '@/component/skeletonUI/SkeletonMovieCard'
import { useRef, useState } from 'react'

interface MovieRowProps extends MovieRowsType {
  userId: string | undefined
  touchEnabled: boolean
}

export default function MovieRow({
  title,
  category,
  immediate = false,
  userId,
  touchEnabled,
}: MovieRowProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -200px 0px',
  })

  const shouldFetch = immediate ? true : inView

  // 모든 훅을 최상위 레벨에서 호출
  const popular = usePopular(shouldFetch && category === 'popular')
  const nowPlaying = useNowPlaying(shouldFetch && category === 'nowPlaying')
  const topRated = useTopRated(shouldFetch && category === 'topRated')
  const upcoming = useUpcoming(shouldFetch && category === 'upcoming')

  // 카테고리에 따라 사용할 데이터와 로딩 상태 선택
  const queryMap = {
    popular,
    nowPlaying,
    topRated,
    upcoming,
  }

  // 드래그 스크롤용
  const scrollRef = useRef<HTMLUListElement | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [dragMoved, setDragMoved] = useState(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!scrollRef.current) return
    isDragging.current = true
    setDragMoved(false)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    if (Math.abs(walk) > 5) setDragMoved(true)
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  // ✅ 클릭 무효화 처리 (드래그 시 클릭 방지)
  const handleClickCapture = (e: React.MouseEvent<HTMLUListElement>) => {
    if (dragMoved) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  const { data: movies = [], isLoading } = queryMap[category]
  const skeletonCount = 20
  const skeletonsToShow = isLoading
    ? Math.max(skeletonCount - movies.length, 0)
    : 0
  return (
    <div className="my-20 min-h-[250px]" ref={ref}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <ul
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar space-x-5 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClickCapture={handleClickCapture}
      >
        {/* 이미 들어온 영화 카드 */}
        {movies.map((movie) => (
          <MovieCard
            key={`${movie.id}${movie.title}`}
            {...movie}
            userId={userId}
            touchEnabled={touchEnabled}
            preventClick={dragMoved} // 드래그 시 클릭방지 플래그
          />
        ))}

        {/* 아직 로딩 중인 카드 자리 Skeleton */}
        {Array.from({ length: skeletonsToShow }).map((_, idx) => (
          <SkeletonMovieCard key={`skeleton-${idx}`} />
        ))}
      </ul>
    </div>
  )
}
