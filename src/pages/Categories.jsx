import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";

import actionImg from "../assets/action.jpg";
import dramaImg from "../assets/drama.jpg";
import romanceImg from "../assets/romance.jpg";
import thrillerImg from "../assets/thriller.jpg";
import westernImg from "../assets/western.jpg";
import horrorImg from "../assets/horror.jpg";
import fantasyImg from "../assets/fantasy.jpg";
import musicImg from "../assets/music.jpg";
import fictionImg from "../assets/fiction.jpg";

const categoriesData = [
  { name: "Action", image: actionImg },
  { name: "Drama", image: dramaImg },
  { name: "Romance", image: romanceImg },
  { name: "Thriller", image: thrillerImg },
  { name: "Western", image: westernImg },
  { name: "Horror", image: horrorImg },
  { name: "Fantasy", image: fantasyImg },
  { name: "Music", image: musicImg },
  { name: "Fiction", image: fictionImg },
];

const Categories = () => {
  const navigate = useNavigate();

  const user = useStore((state) => state.user);
  const savedCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);

  const [selected, setSelected] = useState(savedCategories || []);
  const [showError, setShowError] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1100);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (!user.name || !user.username || !user.email || !user.mobile) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1100);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (category) => {
    let updatedCategories = [];

    if (selected.includes(category)) {
      updatedCategories = selected.filter((item) => item !== category);
    } else {
      updatedCategories = [...selected, category];
    }

    setSelected(updatedCategories);

    if (updatedCategories.length >= 3) {
      setShowError(false);
    }
  };

  const handleNext = () => {
    if (selected.length < 3) {
      setShowError(true);
      return;
    }

    setCategories(selected);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: isTablet ? "flex-start" : "center",
        flexDirection: isTablet ? "column" : "row",
        padding: isMobile ? "20px 16px" : "24px 30px",
        gap: isMobile ? "24px" : "36px",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT SECTION */}
      <div
        style={{
          width: isTablet ? "100%" : "330px",
          maxWidth: isTablet ? "100%" : "330px",
          alignSelf: isTablet ? "stretch" : "flex-start",
          paddingTop: isTablet ? "0" : "12px",
        }}
      >
        <h1
          style={{
            color: "#72DB73",
            fontSize: isMobile ? "30px" : "36px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Super app
        </h1>

        <h2
          style={{
            fontSize: isMobile ? "28px" : "42px",
            lineHeight: "1.2",
            marginTop: "20px",
            marginBottom: 0,
            fontWeight: "700",
            maxWidth: isTablet ? "100%" : "320px",
          }}
        >
          Choose your entertainment category
        </h2>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {selected.map((item) => (
            <span
              key={item}
              style={{
                background: "#148A08",
                color: "#fff",
                padding: "7px 14px",
                borderRadius: "20px",
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {item}
              <span
                onClick={() => handleSelect(item)}
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </span>
            </span>
          ))}
        </div>

        {showError && (
          <p
            style={{
              color: "#FF0000",
              marginTop: "14px",
              fontSize: "14px",
            }}
          >
            Minimum 3 category required
          </p>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div
        style={{
          width: isTablet ? "100%" : "630px",
          maxWidth: isTablet ? "100%" : "630px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
            gap: isMobile ? "12px" : "16px",
          }}
        >
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.name}
              image={category.image}
              selected={selected.includes(category.name)}
              onClick={() => handleSelect(category.name)}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleNext}
            style={{
              marginTop: "22px",
              background: "#148A08",
              color: "#fff",
              border: "none",
              padding: isMobile ? "10px 20px" : "11px 24px",
              borderRadius: "26px",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;