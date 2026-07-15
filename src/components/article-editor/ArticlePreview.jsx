import ArticleRenderer from "../article-renderer/ArticleRenderer";

export default function ArticlePreview({
  title,
  excerpt,
  coverImage,
  category,
  blocks,
}) {
  return (
    <div className="article-preview">

      {coverImage && (
        <div className="preview-hero">
          <img
            src={coverImage}
            alt={title}
          />
        </div>
      )}

      <div className="preview-body">

        <span className="preview-category">
          {category || "Category"}
        </span>

        <h1 className="preview-title">
          {title || "Untitled Article"}
        </h1>

        {excerpt && (
          <p className="preview-excerpt">
            {excerpt}
          </p>
        )}

        <ArticleRenderer
          blocks={blocks}
        />

      </div>

    </div>
  );
}