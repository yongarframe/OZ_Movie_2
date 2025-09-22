import { useInView } from 'react-intersection-observer'
import MovieCardForMovieRow from '@/component/MovieCardForMovieRow'
import {
  usePopular,
  useNowPlaying,
  useTopRated,
  useUpcoming,
} from '@/store/useMovieCategories'
import SkeletonMovieRow from '@/component/skeletonUI/SkeletonMovieRow'

type MovieRowProps = {
  title: string
  category: 'popular' | 'nowPlaying' | 'topRated' | 'upcoming'
  immediate?: boolean
}

// 카테고리별 훅 매핑
const queryMap = {
  popular: usePopular,
  nowPlaying: useNowPlaying,
  topRated: useTopRated,
  upcoming: useUpcoming,
}

export default function MovieRow({
  title,
  category,
  immediate = false,
}: MovieRowProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -200px 0px',
  })

  const shouldFetch = immediate ? true : inView

  const { data: movies = [], isLoading } = queryMap[category](shouldFetch)

  return (
    <div className="mb-10 min-h-[250px]" ref={ref}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>

      {isLoading && !movies.length ? (
        <SkeletonMovieRow />
      ) : (
        <div className="flex overflow-x-auto hide-scrollbar space-x-2">
          {movies.map((movie) => (
            <MovieCardForMovieRow key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
