import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { getActorDetails, getActorCredits } from '../services/tmdb';

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      const [actorData, creditsData] = await Promise.all([
        getActorDetails(id),
        getActorCredits(id),
      ]);
      setActor(actorData);
      setCredits(creditsData);
      setLoading(false);
    };

    fetchActorDetails();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      gsap.from('.actor-details', {
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

  if (!actor) {
    return <div className="text-center text-2xl">Actor not found</div>;
  }

  return (
    <div className="actor-details space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
          alt={actor.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Born: {new Date(actor.birthday).toLocaleDateString()}
            </span>
            {actor.deathday && (
              <span className="text-gray-300">
                Died: {new Date(actor.deathday).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Biography</h2>
          <p className="text-gray-300">{actor.biography}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Filmography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {credits?.cast.slice(0, 8).map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{movie.character}</p>
                  <p className="text-gray-400 text-sm">
                    {movie.release_date?.split('-')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Place of Birth</h3>
              <p className="text-gray-300">{actor.place_of_birth}</p>
            </div>
            <div>
              <h3 className="font-semibold">Known For</h3>
              <p className="text-gray-300">{actor.known_for_department}</p>
            </div>
            <div>
              <h3 className="font-semibold">Popularity</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${actor.popularity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails; 