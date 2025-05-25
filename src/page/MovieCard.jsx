import { useMovieData } from "../store";
import MovieCardRender from "../component/MovieCardRender";

export default function MovieCard() {
  const { movieData } = useMovieData();

  return <MovieCardRender movieData={movieData} />;
}
