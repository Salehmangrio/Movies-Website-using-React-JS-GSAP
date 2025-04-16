import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { getPopularActors } from '../services/tmdb';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      const data = await getPopularActors(currentPage);
      setActors(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };

    fetchActors();
  }, [currentPage]);

  useEffect(() => {
    if (!loading) {
      gsap.from('.actor-card', {
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Popular Actors</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {actors.map((actor) => (
          <Link
            to={`/actor/${actor.id}`}
            key={actor.id}
            className="actor-card group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{actor.name}</h3>
                <p className="text-gray-400 text-sm">
                  Known for: {actor.known_for_department}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Actors; 