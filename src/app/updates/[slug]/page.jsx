import { notFound } from "next/navigation";
import ArticleDetailsClient from "@/components/article/ArticleDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

async function getArticle(slug) {
  console.log("Fetching article:", slug);

  const res = await fetch(
    `${API_URL}/articles/${slug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  console.log("Status:", res.status);

  if (!res.ok) {
    console.log(await res.text());
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const article = await getArticle(slug);
  if (!article) {
    return {
      title: "Article Not Found | JoblyHub",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,

    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://joblyhub.com/updates/${article.slug}`,
      siteName: "JoblyHub",
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  console.log("Slug:", slug);

  const article = await getArticle(slug);
  console.log("Article:", article);

  if (!article) {
    notFound();
  }

  return <ArticleDetailsClient article={article} />;
}