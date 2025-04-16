import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Movie endpoints
export const getPopularMovies = async (page = 1, per_page = 20) => {
  try {
    const response = await tmdb.get('/movie/popular', { params: { page, per_page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getTopRatedMovies = async (page = 1, per_page = 20) => {
  try {
    const response = await tmdb.get('/movie/top_rated', { params: { page, per_page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await tmdb.get('/movie/upcoming', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await tmdb.get('/movie/now_playing', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return null;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await tmdb.get(`/movie/${movieId}/similar`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
};

// Actor endpoints
export const getPopularActors = async (page = 1) => {
  try {
    const response = await tmdb.get('/person/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular actors:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getActorDetails = async (actorId) => {
  try {
    const response = await tmdb.get(`/person/${actorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching actor details:', error);
    return null;
  }
};

export const getActorCredits = async (actorId) => {
  try {
    const response = await tmdb.get(`/person/${actorId}/movie_credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching actor credits:', error);
    return null;
  }
};

// Genre endpoints
export const getMovieGenres = async () => {
  try {
    const response = await tmdb.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdb.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return { results: [], total_pages: 0 };
  }
}; 