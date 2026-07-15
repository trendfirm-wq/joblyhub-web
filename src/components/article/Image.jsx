export default function Image({ data }) {
  return (
    <figure className="article-image-card">

      <img
        src={data.url}
        alt={data.caption || ""}
        className="article-image"
      />

      {data.caption && (
        <figcaption className="article-image-caption">
          {data.caption}
        </figcaption>
      )}

    </figure>
  );
}