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
  const description = normalizeText(
    article.description || article.content || ""
  );
  const image = (article.urlToImage || article.image || "").trim().toLowerCase();
  const source = normalizeText(article.source?.name || article.source || "");
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

    // same url
    if (currentFp.url && existingFp.url && currentFp.url === existingFp.url) {
      return true;
    }

    // same title
    if (currentFp.title && existingFp.title && currentFp.title === existingFp.title) {
      return true;
    }

    // same description
    if (
      currentFp.description &&
      existingFp.description &&
      currentFp.description === existingFp.description
    ) {
      return true;
    }

    // same image + same source
    if (
      currentFp.image &&
      existingFp.image &&
      currentFp.image === existingFp.image &&
      currentFp.source === existingFp.source
    ) {
      return true;
    }

    // title overlap + same source
    if (
      currentFp.source &&
      existingFp.source &&
      currentFp.source === existingFp.source &&
      currentFp.title &&
      existingFp.title &&
      (currentFp.title.includes(existingFp.title) ||
        existingFp.title.includes(currentFp.title))
    ) {
      return true;
    }

    // title+description overlap
    if (
      currentFp.combinedTitleDesc &&
      existingFp.combinedTitleDesc &&
      (currentFp.combinedTitleDesc.includes(existingFp.combinedTitleDesc) ||
        existingFp.combinedTitleDesc.includes(currentFp.combinedTitleDesc))
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

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export const fetchTopNews = async () => {
  try {
    const requests = categories.map((category) =>
      fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=8&apiKey=${NEWS_API_KEY}`
      ).then((response) => response.json())
    );

    const responses = await Promise.all(requests);

    let allArticles = [];

    responses.forEach((data) => {
      if (data.status === "ok" && Array.isArray(data.articles)) {
        allArticles = [...allArticles, ...data.articles];
      }
    });

    const cleanedArticles = allArticles
      .filter((article) => {
        const title = article.title?.trim();
        return (
          title &&
          title !== "[Removed]" &&
          title.toLowerCase() !== "removed" &&
          !title.toLowerCase().includes("[removed]")
        );
      })
      .map((article) => ({
        title: article.title?.trim() || "Untitled News",
        description:
          article.description?.trim() ||
          article.content?.trim() ||
          "No description available for this news article.",
        image: article.urlToImage || "",
        date: article.publishedAt
          ? new Date(article.publishedAt).toLocaleString()
          : "",
        source: article.source?.name || "",
        url: article.url || "",
      }));

    const uniqueArticles = [];

    for (const article of cleanedArticles) {
      if (!isDuplicateArticle(article, uniqueArticles)) {
        uniqueArticles.push(article);
      }
    }

    const shuffledArticles = shuffleArray(uniqueArticles);

    return shuffledArticles.slice(0, 15);
  } catch (error) {
    console.error("News API error:", error);
    return [];
  }
};