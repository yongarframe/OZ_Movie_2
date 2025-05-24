import { useMovieData } from "../store";

export default function MovieCard() {
  const { movieData } = useMovieData();
  console.log(movieData);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <li
              className="list-none transform hover:-translate-y-2 transition-all duration-300"
              key={movie.id}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    className="w-full h-[300px] object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.name}
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-sm">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2">
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-semibold">
                      인기도: {Math.round(movie.popularity)}
                    </span>
                    {movie.gender && (
                      <span className="text-purple-600 font-semibold">
                        {movie.gender}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
