const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default async function sitemap() {
  const res = await fetch(`${API_URL}/articles`);

  const articles = await res.json();

  const articleUrls = articles.map((article) => ({
    url: `https://joblyhub.com/updates/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://joblyhub.com",
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: "https://joblyhub.com/jobs",
      lastModified: new Date(),
      priority: 0.95,
    },

    {
      url: "https://joblyhub.com/updates",
      lastModified: new Date(),
      priority: 0.9,
    },

    ...articleUrls,
  ];
}