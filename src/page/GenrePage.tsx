import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchMoviesByGenre } from '@/API/movieService'
import type { MovieData } from '@/types/MovieData'
import MovieCard from '@/component/MovieCard'
import { useMovieGenres } from '@/store/useMovieGenres'

export default function GenrePage() {
  const { genreId } = useParams<{ genreId: string }>()
  const [movies, setMovies] = useState<MovieData[]>([])
  const genres = useMovieGenres((state) => state.genres)
  const genre = genres.find((g) => g.id.toString() === genreId)

  useEffect(() => {
    if (genreId) {
      const getMovies = async () => {
        const moviesData = await fetchMoviesByGenre(genreId)
        setMovies(moviesData)
      }
      getMovies()
    }
  }, [genreId])

  return (
    <div className="container py-8 bg-black max-w-[1200px] mx-auto px-4">
      {genre?.name && (
        <h1 className="text-2xl font-bold mb-4 text-white">{genre.name}</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            title={movie.title}
            popularity={movie.popularity}
          />
        ))}
      </div>
    </div>
  )
}
