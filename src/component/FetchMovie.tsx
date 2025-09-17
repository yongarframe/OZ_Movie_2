import SlideImage from '@/component/SlideImage'
import MovieCardRender from '@/page/MovieCardRender'
import { useMovieData } from '@/store/useMovieData'

const SLIDE_IMAGE_COUNT = 4

export default function FetchMovie() {
  const movieData = useMovieData((state) => state.movieData)
  const moviePosterData = movieData.map((movie) => movie.poster_path)
  const slideMovieData = moviePosterData.slice(0, SLIDE_IMAGE_COUNT)

  return (
    <>
      <SlideImage slideMovieData={slideMovieData} />
      <MovieCardRender movieData={movieData} />
    </>
  )
}
