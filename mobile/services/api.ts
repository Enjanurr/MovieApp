
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2Y2ZDJmYjNkNWI0OTVkMWQ5MzNhYjg3NzNhODMwNSIsIm5iZiI6MTc2MjE2MjUzNy45MDIwMDAyLCJzdWIiOiI2OTA4Nzc2OWE1OWIxNDg3OWY1OTg2NjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xuOBXU7eVmjFF6WaqBR_UXLWS1Sa5VL4A-dyLy6Z72Q
//97f6d2fb3d5b495d1d933ab8773a8305

/*export const TMBD_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: `Berear ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query:string}) =>{
  
    const endPoint = query ? `${TMBD_CONFIG.BASE_URL}/search/movie?query${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endPoint,{
        method: 'GET',
        headers:TMBD_CONFIG.headers,
    })

    if(!response.ok){
         throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}*/

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};