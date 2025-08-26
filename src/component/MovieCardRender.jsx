import MovieCard from "./MovieCard";

export default function MovieCardRender({ movieData }) {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <MovieCard key={`${movie.id}${movie.name}}`} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
