import MovieCardRender from '@/page/MovieCardRender'
import { useMovieData } from '@/store/useMovieData'

export default function FetchMovie() {
  const movieData = useMovieData((state) => state.movieData)

  return <MovieCardRender movieData={movieData} />
}
