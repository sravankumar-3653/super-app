const CategoryCard = ({ image, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: selected ? "4px solid #11B800" : "4px solid transparent",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={image}
        alt="category"
        style={{
          width: "100%",
          height: "178px",
          objectFit: "cover",
          display: "block",
          borderRadius: "14px",
        }}
      />
    </div>
  );
};

export default CategoryCard;