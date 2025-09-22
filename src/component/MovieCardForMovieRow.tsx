import type { MovieData } from '@/types/MovieData'

export default function MovieCardForMovieRow({ movie }: { movie: MovieData }) {
  return (
    <div className="min-w-[150px] md:min-w-[200px] mr-3 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
      />
      <p className="mt-2 text-sm md:text-base text-white truncate">
        {movie.title}
      </p>
    </div>
  )
}
