import { useParams } from 'react-router-dom'
import MovieCard from '@/component/MovieCard'
import { useMovieGenres } from '@/store/useMovieGenres'
import useGenrePageInfiniteScroll from '@/hooks/useGenrePageInfiniteScroll'
import { useGenreMovie } from '@/store/useGenreMovie'
import { useEffect, useState } from 'react'

export default function GenrePage() {
  const { genreId } = useParams<{ genreId: string }>()
  const genres = useMovieGenres((state) => state.genres)
  const genre = genres.find((g) => g.id.toString() === genreId)
  const [page, setPage] = useState(1)
  const observerRef = useGenrePageInfiniteScroll(genreId ?? null, page, setPage)
  const genreMovie = useGenreMovie((state) => state.genreMovie)
  const fetchGenreMovie = useGenreMovie((state) => state.fetchGenreMovie)
  useEffect(() => {
    const timer = setTimeout(() => setPage(1), 0)
    fetchGenreMovie(genreId ?? null)
    window.scrollTo(0, 0)
    return () => clearTimeout(timer)
  }, [genreId])
  return (
    <div className="container py-8 bg-black max-w-[1200px] mx-auto px-4">
      {genre?.name && (
        <h1 className="text-2xl font-bold mb-4 text-white">{genre.name}</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genreMovie.map((movie, index) => (
          <MovieCard
            key={`${movie.id}${index}`}
            id={movie.id}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            title={movie.title}
            popularity={movie.popularity}
          />
        ))}
      </div>
      {genreMovie.length > 0 && <div ref={observerRef} className="h-1"></div>}
    </div>
  )
}
