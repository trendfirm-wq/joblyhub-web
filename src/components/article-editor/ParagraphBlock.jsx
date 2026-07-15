export default function ParagraphBlock({
  block,
  onChange,
}) {
  return (
    <div className="block-content">

      <div className="block-title">
        Paragraph
      </div>

      <textarea
        rows={8}
        value={block.data.text}
        placeholder="Start writing your paragraph..."
        onChange={(e) =>
          onChange({
            ...block,
            data: {
              text: e.target.value,
            },
          })
        }
      />

    </div>
  );
}