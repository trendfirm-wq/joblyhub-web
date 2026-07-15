"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  Search,
} from "lucide-react";
import "../styles/Updates.css";
import "../styles/App.css";
import InfoPage from "./InfoPage";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function Updates() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const { data } = await axios.get(
        `${API_URL}/articles`
      );

      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <InfoPage
      eyebrow="JoblyHub Updates"
      title="Career insights, workplace trends, and hiring updates."
      subtitle="Explore articles, guides, and updates that help job seekers, employers, and professionals understand the changing world of work."
      badge="Insights for job seekers and employers"
    >
      <section className="premium-section">
        <div className="section-heading">
          <span>Featured Updates</span>

          <h2>Read our latest published articles.</h2>

          <p>
            Browse JoblyHub updates designed to educate,
            inform and support users across Ghana's
            growing job market.
          </p>
        </div>

        {loading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="updates-grid">
            {articles.map((article) => (
              <article
                key={article._id}
                className="update-card"
              >
                <Link
                  href={`/updates/${article.slug}`}
                  className="update-image-wrap"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                  />

                  <span>{article.category}</span>
                </Link>

                <div className="update-card-body">
                  <p className="update-date">
                    {article.publishedAt
                      ? new Date(
                          article.publishedAt
                        ).toLocaleDateString()
                      : ""}
                  </p>

                  <Link
                    href={`/updates/${article.slug}`}
                    className="update-title-link"
                  >
                    <h2>{article.title}</h2>
                  </Link>

                  <p>{article.excerpt}</p>

                  <Link
                    href={`/updates/${article.slug}`}
                    className="update-link"
                  >
                    Read article

                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="split-section">
        <div className="split-card dark-card">
          <Sparkles />

          <span>Why Updates Matter</span>

          <h2>
            Information can help people make
            better career decisions.
          </h2>

          <p>
            JoblyHub Updates is designed to
            help users understand employment
            trends, prepare for opportunities
            and stay aware of changes in the
            world of work.
          </p>
        </div>

        <div className="split-card light-card">
          <Search />

          <h3>What You Will Find Here</h3>

          <div className="mini-faq">
            <h4>Career guidance</h4>

            <p>
              Helpful content for job seekers
              and young professionals.
            </p>
          </div>

          <div className="mini-faq">
            <h4>Employer education</h4>

            <p>
              Useful insights for businesses
              and recruiters.
            </p>
          </div>

          <div className="mini-faq">
            <h4>Workplace trends</h4>

            <p>
              Articles on AI, digital skills,
              hiring and future jobs.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <h2>
            Looking for opportunities?
          </h2>

          <p>
            Explore available jobs on
            JoblyHub and take the next
            step in your career journey.
          </p>
        </div>

        <div className="cta-actions">
          <Link
            href="/jobs"
            className="btn btn-primary"
          >
            Browse Jobs
          </Link>

          <Link
            href="/register/employer"
            className="btn btn-ghost"
          >
            Post a Job
          </Link>
        </div>
      </section>
    </InfoPage>
  );
}