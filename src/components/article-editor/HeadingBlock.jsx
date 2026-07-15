export default function HeadingBlock({
  block,
  onChange,
}) {
  return (
    <div className="editor-block">
      <label>Heading</label>

      <input
        type="text"
        value={block.data.text}
        placeholder="Heading..."
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