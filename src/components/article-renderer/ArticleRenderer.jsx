export default function ArticleRenderer({ blocks = [] }) {
  return (
    <div className="article-renderer">

      {blocks.map((block, index) => {

        switch (block.type) {

          case "richtext":
            return (
              <div
                key={block.id || index}
                dangerouslySetInnerHTML={{
                  __html: block.data.content || "",
                }}
              />
            );

          case "image":
            return (
              <figure key={block.id || index}>

                <img
                  src={block.data.url}
                  alt={block.data.caption || ""}
                />

                {block.data.caption && (
                  <figcaption>
                    {block.data.caption}
                  </figcaption>
                )}

              </figure>
            );

          case "callout":
            return (
              <div
                key={block.id || index}
                className={`callout ${block.data.variant}`}
              >
                <h4>{block.data.title}</h4>

                <p>{block.data.body}</p>
              </div>
            );

          default:
            return null;

        }

      })}

    </div>
  );
}