export default function Callout({ data }) {
  return (
    <div className={`callout ${data.variant}`}>
      <h4>{data.title}</h4>

      <p>{data.body}</p>
    </div>
  );
}