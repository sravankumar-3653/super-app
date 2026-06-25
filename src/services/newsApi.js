const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/\[.*?\]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getFingerprint = (article) => {
  const title = normalizeText(article.title || "");
  const description = normalizeText(article.description || "");
  const image = (article.image || "").trim().toLowerCase();
  const source = normalizeText(article.source || "");
  const url = (article.url || "").trim().toLowerCase();

  return {
    title,
    description,
    image,
    source,
    url,
    combinedTitleDesc: `${title} ${description}`.trim(),
  };
};

const isDuplicateArticle = (current, existingList) => {
  const currentFp = getFingerprint(current);

  return existingList.some((existing) => {
    const existingFp = getFingerprint(existing);

    if (currentFp.url && existingFp.url && currentFp.url === existingFp.url) {
      return true;
    }

    if (
      currentFp.title &&
      existingFp.title &&
      currentFp.title === existingFp.title
    ) {
      return true;
    }

    if (
      currentFp.description &&
      existingFp.description &&
      currentFp.description === existingFp.description
    ) {
      return true;
    }

    if (
      currentFp.image &&
      existingFp.image &&
      currentFp.image === existingFp.image &&
      currentFp.source === existingFp.source
    ) {
      return true;
    }

    if (
      currentFp.combinedTitleDesc &&
      existingFp.combinedTitleDesc &&
      currentFp.combinedTitleDesc === existingFp.combinedTitleDesc
    ) {
      return true;
    }

    return false;
  });
};

const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const fetchTopNews = async () => {
  try {
    const response = await fetch(
      "https://api.currentsapi.services/v1/latest-news?language=en",
      {
        headers: {
          Authorization: NEWS_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data.news || !Array.isArray(data.news)) {
      console.error("Currents API error:", data);
      return [];
    }

    const cleanedArticles = data.news
      .filter((article) => article.title && article.title.trim() !== "")
      .map((article) => ({
        title: article.title?.trim() || "Untitled News",
        description:
          article.description?.trim() ||
          "No description available for this news article.",
        image: article.image || "",
        date: article.published
          ? new Date(article.published).toLocaleString()
          : "",
        source: article.author || article.url || "",
        url: article.url || "",
      }));

    const uniqueArticles = [];

    for (const article of cleanedArticles) {
      if (!isDuplicateArticle(article, uniqueArticles)) {
        uniqueArticles.push(article);
      }
    }

    return shuffleArray(uniqueArticles).slice(0, 15);
  } catch (error) {
    console.error("News API error:", error);
    return [];
  }
};