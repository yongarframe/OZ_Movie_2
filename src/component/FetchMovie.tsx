import MovieRow from '@/component/MovieRow'
import MovieSlider from '@/component/MovieSlider'
import { usePopular } from '@/store/useMovieCategories'

const SLIDE_IMAGE_COUNT = 4

export default function FetchMovie() {
  const { data: popular = [] } = usePopular(true) // 즉시 fetch
  const slideMovieData = popular.slice(0, SLIDE_IMAGE_COUNT)

  return (
    <div className="bg-black min-h-screen px-5 md:px-10 py-10 md:py-20">
      <MovieSlider slideMovieData={slideMovieData} />
      <div className="mt-20">
        <MovieRow title="인기 영화" category="popular" immediate />
        <MovieRow title="현재 상영작" category="nowPlaying" />
        <MovieRow title="평점 높은 영화" category="topRated" />
        <MovieRow title="개봉 예정작" category="upcoming" />
      </div>
    </div>
  )
}
