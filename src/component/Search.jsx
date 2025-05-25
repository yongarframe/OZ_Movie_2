import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../store";
import { useEffect } from "react";
import MovieCardRender from "./MovieCardRender";

export default function Search() {
  const [searchParms] = useSearchParams();
  const params = searchParms.get("movie");
  const { searchMovie, fetchSearchMovie } = useSearchMovie();
  console.log("params", params);

  console.log("searchMovie", searchMovie);
  useEffect(() => {
    fetchSearchMovie(params);
  }, [params]);

  console.log("searchMovie", searchMovie);

  return <MovieCardRender movieData={searchMovie} />;
}
