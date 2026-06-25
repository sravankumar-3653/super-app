const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const categoryQueries = {
  Action: "action",
  Drama: "drama",
  Romance: "romance",
  Thriller: "thriller",
  Western: "western",
  Horror: "horror",
  Fantasy: "fantasy",
  Music: "music",
  Fiction: "fiction",
};

export const fetchMoviesByCategory = async (category) => {
  try {
    const query = categoryQueries[category] || category;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
    );

    const data = await response.json();

    if (data.Response === "True") {
      return data.Search.slice(0, 4);
    }

    return [];
  } catch (error) {
    console.error("Movie API error:", error);
    return [];
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    const data = await response.json();

    if (data.Response === "True") {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Movie details error:", error);
    return null;
  }
};