import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getPopularActors,
} from '../services/tmdb';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularActors, setPopularActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [
        popular,
        topRated,
        upcoming,
        nowPlaying,
        actors,
      ] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
        getNowPlayingMovies(),
        getPopularActors(),
      ]);
      setPopularMovies(popular.results);
      setTopRatedMovies(topRated.results);
      setUpcomingMovies(upcoming.results);
      setNowPlayingMovies(nowPlaying.results);
      setPopularActors(actors.results);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from('.movie-card, .actor-card', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
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

  const renderMovieSection = (title, movies) => (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <Link
          to="/movies"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {movies.slice(0, 12).map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movie-card group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20">
              <div className="relative aspect-[2/3]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-300">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {movie.release_date?.split('-')[0]}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-12">
      {renderMovieSection('Popular Movies', popularMovies)}
      {renderMovieSection('Top Rated Movies', topRatedMovies)}
      {renderMovieSection('Upcoming Movies', upcomingMovies)}
      {renderMovieSection('Now Playing', nowPlayingMovies)}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Popular Actors</h2>
          <Link
            to="/actors"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {popularActors.slice(0, 12).map((actor) => (
            <Link
              to={`/actor/${actor.id}`}
              key={actor.id}
              className="actor-card group"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <div className="relative aspect-[2/3]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                      {actor.name}
                    </p>
                  </div>
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                    {actor.known_for_department}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 