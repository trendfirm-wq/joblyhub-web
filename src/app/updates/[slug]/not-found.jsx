import Link from "next/link";

export default function NotFound() {
  return (
    <main className="article-not-found">
      <h1>Article not found</h1>

      <p>
        The article you're looking for
        doesn't exist.
      </p>

      <Link
        href="/updates"
        className="btn btn-primary"
      >
        Back to Updates
      </Link>
    </main>
  );
}