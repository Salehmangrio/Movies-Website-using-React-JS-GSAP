import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { searchMovies, getSimilarMovies } from '../services/tmdb';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);

        const results = await searchMovies(query, currentPage);
        
        if (results && results.results) {
          setSearchResults(results.results);
          setTotalPages(results.total_pages);

          // Get similar movies for the first result if available
          if (results.results.length > 0) {
            const similar = await getSimilarMovies(results.results[0].id);
            if (similar && similar.results) {
              setRelatedMovies(similar.results);
            }
          }
        } else {
          setSearchResults([]);
          setRelatedMovies([]);
        }
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  useEffect(() => {
    if (!loading && !error) {
      gsap.from('.movie-card', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [loading, error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderMovieSection = (title, movies) => (
    <section className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2 sm:gap-3 md:gap-4">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movie-card group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20">
              <div className="relative aspect-[2/3]">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center p-2">
                    <span className="text-gray-400 text-xs text-center mb-2">No Poster Available</span>
                    <span className="text-white text-xs sm:text-sm font-medium text-center line-clamp-3">
                      {movie.title}
                    </span>
                  </div>
                )}
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
    </section>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Search Results for "{query}"
        </h1>
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

      {searchResults.length > 0 ? (
        <>
          {renderMovieSection('Search Results', searchResults)}
          {relatedMovies.length > 0 && (
            <div className="mt-8">
              {renderMovieSection('Similar Movies', relatedMovies)}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No movies found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default Search; 