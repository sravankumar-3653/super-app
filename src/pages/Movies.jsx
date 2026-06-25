import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import smallProfileImg from "../assets/smallprofile.jpg";
import {
  fetchMoviesByCategory,
  fetchMovieDetails,
} from "../services/movieApi";

const Movies = () => {
  const navigate = useNavigate();
  const categories = useStore((state) => state.categories);

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const pageRef = useRef(null);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      navigate("/categories");
      return;
    }

    const getMovies = async () => {
      setLoading(true);
      const result = {};

      for (const category of categories) {
        const movies = await fetchMoviesByCategory(category);
        result[category] = movies;
      }

      setMoviesByCategory(result);
      setLoading(false);
    };

    getMovies();
  }, [categories, navigate]);

  const handleMovieClick = async (movie) => {
    if (!movie?.imdbID) return;

    setDetailsLoading(true);
    const details = await fetchMovieDetails(movie.imdbID);
    setSelectedMovie(details);
    setDetailsLoading(false);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const scrollToBottom = () => {
    if (pageRef.current) {
      pageRef.current.scrollTo({
        top: pageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={pageRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#000",
        color: "#fff",
        padding: "24px 36px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          minHeight: "calc(100vh - 48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "22px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "#72DB73",
                  fontSize: "38px",
                  fontWeight: "700",
                  margin: 0,
                  marginBottom: "10px",
                  lineHeight: 1,
                  fontFamily: '"Single Day", cursive',
                }}
              >
                Super app
              </h1>

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Entertainment according to your choice
              </h2>
            </div>

            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={smallProfileImg}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          
          {loading ? (
            <p style={{ fontSize: "18px", color: "#aaa", marginTop: "40px" }}>
              Loading movies...
            </p>
          ) : (
            categories.slice(0, 3).map((category) => (
              <div key={category} style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    color: "#878787",
                    fontSize: "22px",
                    fontWeight: "600",
                    margin: 0,
                    marginBottom: "12px",
                  }}
                >
                  {category}
                </h3>

                {moviesByCategory[category] &&
                moviesByCategory[category].length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "24px",
                    }}
                  >
                    {moviesByCategory[category].slice(0, 4).map((movie, index) => {
                      const imageSrc =
                        movie.Poster && movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/342x192?text=No+Image";

                      return (
                        <div
                          key={movie.imdbID || `${category}-${index}`}
                          onClick={() => handleMovieClick(movie)}
                          style={{
                            width: "100%",
                            height: "192px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: "#111",
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <img
                            src={imageSrc}
                            alt={movie.Title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#aaa",
                      fontSize: "18px",
                      margin: 0,
                    }}
                  >
                    No movies found for {category}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "18px",
            paddingBottom: "4px",
          }}
        >
          

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "#148A08",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              width: "180px",
              height: "52px",
              fontSize: "20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      </div>

      
      {(detailsLoading || selectedMovie) && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "820px",
              background: "#1c1c1c",
              borderRadius: "18px",
              overflow: "hidden",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            }}
          >
            {detailsLoading ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  fontSize: "22px",
                }}
              >
                Loading movie details...
              </div>
            ) : selectedMovie ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: "24px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "390px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#111",
                  }}
                >
                  <img
                    src={
                      selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                        ? selectedMovie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={selectedMovie.Title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "32px",
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedMovie.Title}
                    </h2>

                    <button
                      onClick={closeModal}
                      style={{
                        background: "transparent",
                        color: "#fff",
                        border: "1px solid #666",
                        borderRadius: "10px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <p style={{ margin: "0 0 10px", color: "#bbb", fontSize: "15px" }}>
                    {selectedMovie.Year} • {selectedMovie.Rated} •{" "}
                    {selectedMovie.Runtime}
                  </p>

                  <p style={{ margin: "0 0 10px", fontSize: "15px", color: "#ddd" }}>
                    <strong>Genre:</strong> {selectedMovie.Genre}
                  </p>

                  <p style={{ margin: "0 0 10px", fontSize: "15px", color: "#ddd" }}>
                    <strong>Director:</strong> {selectedMovie.Director}
                  </p>

                  <p style={{ margin: "0 0 10px", fontSize: "15px", color: "#ddd" }}>
                    <strong>Actors:</strong> {selectedMovie.Actors}
                  </p>

                  <p style={{ margin: "0 0 10px", fontSize: "15px", color: "#ddd" }}>
                    <strong>IMDb Rating:</strong> {selectedMovie.imdbRating}
                  </p>

                  <div style={{ marginTop: "8px" }}>
                    <h4
                      style={{
                        margin: "0 0 8px",
                        fontSize: "18px",
                        color: "#72DB73",
                      }}
                    >
                      Plot
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        lineHeight: "1.7",
                        color: "#e5e5e5",
                      }}
                    >
                      {selectedMovie.Plot}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;