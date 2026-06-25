const MovieCard = ({ movie, onClick }) => {
  const imageUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/342x192?text=No+Image";

  return (
    <div
      onClick={onClick}
      style={{
        width: "342px",
        height: "192px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "#1a1a1a",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={imageUrl}
        alt={movie.Title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15), transparent)",
          display: "flex",
          alignItems: "flex-end",
          padding: "14px",
        }}
      >
        <div>
          <h4
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {movie.Title}
          </h4>
          <p
            style={{
              margin: "4px 0 0",
              color: "#d9d9d9",
              fontSize: "14px",
            }}
          >
            {movie.Year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;