"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Newspaper,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

import InfoPage from "@/pages/InfoPage";
import ArticleRenderer from "./ArticleRenderer";
 

import "@/styles/App.css";
import "@/styles/Updates.css";

export default function ArticleDetailsClient({
  article,
}) {
  const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

useEffect(() => {
  fetch(`${API_URL}/articles/${article.slug}/view`, {
    method: "POST",
  }).catch(console.error);
}, [article.slug]);
  return (
    <InfoPage
      eyebrow={article.category}
      title={article.title}
      subtitle={article.excerpt}
      badge="JoblyHub Article"
    >
      <section className="article-premium-wrap">
        <Link
          href="/updates"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Back to Updates
        </Link>

        <article className="article-container">
          <div className="article-hero-img">
            <img
              src={article.coverImage}
              alt={article.title}
            />
          </div>

          <div className="article-meta-row">
            <span>
              <Newspaper size={17} />
              {article.category}
            </span>

            <span>
              <CalendarDays size={17} />
              {new Date(
                article.publishedAt
              ).toLocaleDateString()}
            </span>

            <span>
              <UserRound size={17} />
              {article.author}
            </span>
          </div>

          <div className="article-content">
            <ArticleRenderer
              blocks={article.blocks}
            />
          </div>
        </article>
      </section>

      <section className="split-section">
        <div className="split-card dark-card">
          <Briefcase />

          <span>Career Reminder</span>

          <h2>
            Use insights like this to prepare
            for better opportunities.
          </h2>

          <p>
            JoblyHub articles are created to
            help job seekers, employers and
            professionals understand the
            changing job market.
          </p>

          <div className="safety-points">
            <p>
              <CheckCircle2 size={18} />
              Build relevant skills.
            </p>

            <p>
              <CheckCircle2 size={18} />
              Stay updated on workplace
              trends.
            </p>

            <p>
              <CheckCircle2 size={18} />
              Apply confidently.
            </p>
          </div>
        </div>

        <div className="split-card light-card">
          <Newspaper />

          <h3>Continue Reading</h3>

          <p>
            Explore more JoblyHub updates.
          </p>

          <Link
            href="/updates"
            className="btn btn-primary"
          >
            View More Updates
          </Link>
        </div>
      </section>
    </InfoPage>
  );
}