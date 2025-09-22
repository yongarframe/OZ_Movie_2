import MovieCardForMovieRow from '@/component/MovieCardForMovieRow'
import type { MovieData } from '@/types/MovieData'

export default function MovieRow({
  title,
  movies,
}: {
  title: string
  movies: MovieData[]
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-auto hide-scrollbar space-x-2">
        {movies.map((movie) => (
          <MovieCardForMovieRow key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
