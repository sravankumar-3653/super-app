import { useEffect, useRef, useState } from "react";
import { fetchTopNews } from "../services/newsApi";
import newsFallbackImg from "../assets/news.jpg";

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const refreshIntervalRef = useRef(null);
  const rotateIntervalRef = useRef(null);

  useEffect(() => {
    const loadNews = async (isInitialLoad = false) => {
      const news = await fetchTopNews();

      if (news.length > 0) {
        setArticles((prevArticles) => {
          // first load
          if (prevArticles.length === 0 || isInitialLoad) {
            setActiveIndex(0);
            return news;
          }

          // if fetched list is different, replace it
          const prevUrls = prevArticles.map((item) => item.url).join("|");
          const newUrls = news.map((item) => item.url).join("|");

          if (prevUrls !== newUrls) {
            setActiveIndex(0);
            return news;
          }

          return prevArticles;
        });
      }
    };

    loadNews(true);

    refreshIntervalRef.current = setInterval(() => {
      loadNews(false);
    }, 60000);

    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }

    if (articles.length > 1) {
      rotateIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % articles.length);
      }, 2000);
    }

    return () => {
      if (rotateIntervalRef.current) clearInterval(rotateIntervalRef.current);
    };
  }, [articles]);

  const activeArticle = articles[activeIndex];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        height: "610px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!activeArticle ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#222",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Loading news...
        </div>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              height: "310px",
              flexShrink: 0,
              background: "#111",
            }}
          >
            <img
              src={activeArticle.image || newsFallbackImg}
              alt={activeArticle.title}
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
                left: 0,
                right: 0,
                bottom: 0,
                padding: "18px 16px 14px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.45), rgba(0,0,0,0))",
                color: "#fff",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  fontWeight: "600",
                }}
              >
                {activeArticle.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#d8d8d8",
                  lineHeight: "1.4",
                }}
              >
                {activeArticle.date}
              </p>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px",
              color: "#272727",
              fontSize: "14px",
              lineHeight: "1.9",
              overflowY: "auto",
            }}
          >
            {activeArticle.description ||
              "No description available for this news article."}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsWidget;