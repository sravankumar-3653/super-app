import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import smallProfileImg from "../assets/smallprofile.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useStore((state) => state.user);
 const categories = useStore((state) => state.selectedCategories);

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1100);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1100);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBrowse = () => {
    navigate("/movies");
  };

  const gridTemplateAreas = isMobile
    ? `
      "profile"
      "weather"
      "notes"
      "timer"
      "news"
      "browse"
    `
    : isTablet
    ? `
      "profile notes"
      "weather notes"
      "timer timer"
      "news news"
      "browse browse"
    `
    : `
      "profile notes news"
      "weather notes news"
      "timer timer news"
      ". . browse"
    `;

  const gridTemplateColumns = isMobile
    ? "1fr"
    : isTablet
    ? "1fr 1fr"
    : "1.05fr 1.05fr 0.95fr";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: isMobile ? "16px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isTablet ? "100%" : "1250px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns,
          gridTemplateAreas,
          gap: isMobile ? "14px" : "18px",
        }}
      >
        
        <div
          style={{
            gridArea: "profile",
            background: "linear-gradient(135deg, #5746EA 0%, #3E2CCF 100%)",
            borderRadius: "24px",
            padding: isMobile ? "14px" : "18px",
            display: "flex",
            gap: isMobile ? "12px" : "16px",
            minHeight: isMobile ? "180px" : "200px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: isMobile ? "90px" : "110px",
              minWidth: isMobile ? "90px" : "110px",
              height: isMobile ? "140px" : "170px",
              borderRadius: "24px",
              overflow: "hidden",
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

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "15px" : "18px",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {user?.name || ""}
            </p>

            <p
              style={{
                margin: "6px 0 0",
                fontSize: isMobile ? "14px" : "18px",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {user?.email || ""}
            </p>

            <h2
              style={{
                margin: isMobile ? "12px 0 14px" : "14px 0 18px",
                fontSize: isMobile ? "24px" : "34px",
                lineHeight: "1.05",
                fontWeight: "700",
                wordBreak: "break-word",
              }}
            >
              {user?.username || ""}
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? "8px" : "10px",
                marginTop: "auto",
              }}
            >
              {categories?.map((item) => (
                <span
                  key={item}
                  style={{
                    background: "#9F94FF",
                    color: "#fff",
                    padding: isMobile ? "6px 12px" : "8px 16px",
                    borderRadius: "20px",
                    fontSize: isMobile ? "12px" : "15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        
        <div style={{ gridArea: "weather", minWidth: 0 }}>
          <WeatherWidget />
        </div>

       
        <div style={{ gridArea: "notes", minWidth: 0 }}>
          <NotesWidget />
        </div>

        
        <div style={{ gridArea: "news", minWidth: 0 }}>
          <NewsWidget />
        </div>

        
        <div style={{ gridArea: "timer", minWidth: 0 }}>
          <TimerWidget />
        </div>

        
        <div
          style={{
            gridArea: "browse",
            display: "flex",
            justifyContent: isMobile ? "stretch" : "flex-end",
            alignItems: "flex-start",
          }}
        >
          <button
            onClick={handleBrowse}
            style={{
              background: "#148A08",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              width: isMobile ? "100%" : "150px",
              height: isMobile ? "46px" : "50px",
              fontSize: isMobile ? "18px" : "25px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;