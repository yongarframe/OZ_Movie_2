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

  const { data: movies = [], isLoading } = queryMap[category]
  const skeletonCount = 20
  const skeletonsToShow = isLoading
    ? Math.max(skeletonCount - movies.length, 0)
    : 0
  return (
    <div className="mb-10 min-h-[250px]" ref={ref}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <ul className="flex overflow-x-auto hide-scrollbar space-x-2">
        {/* 이미 들어온 영화 카드 */}
        {movies.map((movie) => (
          <MovieCard
            key={`${movie.id}${movie.title}`}
            {...movie}
            userId={userId}
            touchEnabled={touchEnabled}
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
