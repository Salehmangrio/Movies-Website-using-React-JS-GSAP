import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { getPopularMovies, getTopRatedMovies } from '../services/tmdb';

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [popular, topRated] = await Promise.all([
        getPopularMovies(currentPage),
        getTopRatedMovies(currentPage),
      ]);
      setPopularMovies(popular.results);
      setTopRatedMovies(topRated.results);
      setFilteredMovies(popular.results);
      setTotalPages(popular.total_pages);
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    if (!loading) {
      gsap.from('.movie-card', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [loading]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredMovies(popularMovies);
    } else {
      const filtered = popularMovies.filter(movie => 
        movie.title.toLowerCase().includes(query)
      );
      setFilteredMovies(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">All Movies</h1>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm sm:text-base bg-gray-800 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm sm:text-base bg-gray-800 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2 sm:gap-3 md:gap-4">
        {filteredMovies.map((movie) => (
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
                <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-[10px] sm:text-xs font-medium line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </div>
              <div className="p-1.5 sm:p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-0.5">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[10px] sm:text-xs text-gray-300">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400">
                    {movie.release_date?.split('-')[0]}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies; 