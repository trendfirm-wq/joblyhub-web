export default function CalloutBlock({
  block,
  onChange,
}) {
  return (
    <div className="editor-block">

      <label>Callout</label>

      <select
        value={block.data.variant}
        onChange={(e)=>
          onChange({
            ...block,
            data:{
              ...block.data,
              variant:e.target.value,
            },
          })
        }
      >
        <option value="info">Information</option>

        <option value="success">Success</option>

        <option value="warning">Warning</option>

        <option value="danger">Danger</option>
      </select>

      <input
        placeholder="Title..."
        value={block.data.title}
        onChange={(e)=>
          onChange({
            ...block,
            data:{
              ...block.data,
              title:e.target.value,
            },
          })
        }
      />

      <textarea
        rows={5}
        placeholder="Write the message..."
        value={block.data.body}
        onChange={(e)=>
          onChange({
            ...block,
            data:{
              ...block.data,
              body:e.target.value,
            },
          })
        }
      />

    </div>
  );
}