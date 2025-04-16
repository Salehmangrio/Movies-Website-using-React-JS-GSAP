import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            MovieDB
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/movies" className="text-gray-300 hover:text-white">
              Movies
            </Link>
            <Link to="/actors" className="text-gray-300 hover:text-white">
              Actors
            </Link>
            
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 