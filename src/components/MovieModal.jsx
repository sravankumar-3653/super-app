import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movieApi";

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie?.imdbID) return;

    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieDetails(movie.imdbID);
      setMovieDetails(data);
      setLoading(false);
    };

    fetchDetails();
  }, [movie]);

  if (!movie) return null;

  const details = movieDetails || movie;

  const imageUrl =
    details.Poster && details.Poster !== "N/A"
      ? details.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.78)",
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
          width: "950px",
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#111",
          borderRadius: "20px",
          overflowX: "hidden",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          color: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ background: "#000" }}>
          <img
            src={imageUrl}
            alt={details.Title}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ padding: "28px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "none",
              background: "#2b2b2b",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

          {loading ? (
            <p style={{ fontSize: "18px", color: "#bbb" }}>
              Loading movie details...
            </p>
          ) : (
            <>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "34px",
                  fontWeight: "700",
                }}
              >
                {details.Title}
              </h2>

              <p
                style={{
                  color: "#bbb",
                  marginBottom: "18px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                {details.Year} • {details.Rated} • {details.Runtime} •{" "}
                {details.Genre}
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "#e5e5e5",
                }}
              >
                <p>
                  <strong>IMDb Rating:</strong> {details.imdbRating || "N/A"}
                </p>
                <p>
                  <strong>Director:</strong> {details.Director || "N/A"}
                </p>
                <p>
                  <strong>Writer:</strong> {details.Writer || "N/A"}
                </p>
                <p>
                  <strong>Actors:</strong> {details.Actors || "N/A"}
                </p>
                <p>
                  <strong>Language:</strong> {details.Language || "N/A"}
                </p>
                <p>
                  <strong>Country:</strong> {details.Country || "N/A"}
                </p>
                <p>
                  <strong>Awards:</strong> {details.Awards || "N/A"}
                </p>
                <p>
                  <strong>Plot:</strong> {details.Plot || "No description available."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;