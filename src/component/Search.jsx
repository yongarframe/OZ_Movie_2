import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../store";
import { useEffect } from "react";
import MovieCardRender from "../page/MovieCardRender";

export default function Search() {
  const [searchParms] = useSearchParams();
  const params = searchParms.get("movie");
  const { searchMovie, fetchSearchMovie } = useSearchMovie();

  useEffect(() => {
    fetchSearchMovie(params);
  }, [params]);

  return <MovieCardRender movieData={searchMovie} />;
}
