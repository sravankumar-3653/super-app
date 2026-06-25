import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { fetchMoviesByCategory } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import profileImg from "../assets/smallprofile.jpg";

const Movies = () => {
  const navigate = useNavigate();

  const selectedCategories = useStore((state) => state.selectedCategories);
  const user = useStore((state) => state.user);

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!selectedCategories || selectedCategories.length < 3) {
      navigate("/categories");
      return;
    }

    const getMovies = async () => {
      setLoading(true);

      try {
        const results = await Promise.all(
          selectedCategories.map(async (category) => {
            const movies = await fetchMoviesByCategory(category);
            return { category, movies };
          })
        );

        const formattedData = {};
        results.forEach(({ category, movies }) => {
          formattedData[category] = Array.isArray(movies) ? movies : [];
        });

        setMoviesByCategory(formattedData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [selectedCategories, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        padding: "24px 32px 40px",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#72DB73",
              fontSize: "42px",
              fontWeight: "700",
            }}
          >
            Super app
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            Entertainment according to your choice
          </p>
        </div>

        <img
          src={profileImg}
          alt="profile"
          style={{
            width: "62px",
            height: "62px",
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* Loading */}
      {loading ? (
        <p style={{ fontSize: "20px", marginTop: "40px" }}>Loading movies...</p>
      ) : (
        <div>
          {selectedCategories.map((category) => (
            <div key={category} style={{ marginBottom: "34px" }}>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  color: "#878787",
                  marginBottom: "16px",
                }}
              >
                {category}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
              >
                {(moviesByCategory[category] || []).slice(0, 4).map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={() => setSelectedMovie(movie)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Movie modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Movies;