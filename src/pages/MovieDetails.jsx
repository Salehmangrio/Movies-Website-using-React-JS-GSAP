import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
} from '../services/tmdb';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const [movieData, creditsData, similarData] = await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
        getSimilarMovies(id),
      ]);
      setMovie(movieData);
      setCredits(creditsData);
      setSimilarMovies(similarData);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      gsap.from('.movie-details', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-2xl">Movie not found</div>;
  }

  return (
    <div className="movie-details space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400">
              Rating: {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime} minutes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300">{movie.overview}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {credits?.cast.slice(0, 8).map((actor) => (
                <div key={actor.id} className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{actor.name}</h3>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Production Companies</h3>
              <div className="mt-2">
                {movie.production_companies.map((company) => (
                  <p key={company.id} className="text-gray-300">
                    {company.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {similarMovies.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-gray-400 text-sm">
                  Rating: {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 