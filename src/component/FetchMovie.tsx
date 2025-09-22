import { useEffect } from 'react'
import { useMovieCategories } from '@/store/useMovieCategories'
import MovieRow from '@/component/MovieRow'

export default function FetchMovie() {
  const { nowPlaying, topRated, upcoming, popular, fetchCategories } =
    useMovieCategories()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <div className="bg-black min-h-screen px-5 md:px-10 py-10 md:py-20">
      <MovieRow title="인기 영화" movies={popular} />
      <MovieRow title="현재 상영작" movies={nowPlaying} />
      <MovieRow title="평점 높은 영화" movies={topRated} />
      <MovieRow title="개봉 예정작" movies={upcoming} />
    </div>
  )
}
