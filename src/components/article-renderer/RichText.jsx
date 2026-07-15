export default function RichText({ data }) {

  return (
    <div
      className="article-richtext"
      dangerouslySetInnerHTML={{
        __html: data.content || "",
      }}
    />
  );

}