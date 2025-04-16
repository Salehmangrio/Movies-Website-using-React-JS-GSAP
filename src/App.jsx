import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Actors from './pages/Actors';
import ActorDetails from './pages/ActorDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
