import { useState } from "react";

const blocks = [
  {
    type: "paragraph",
    icon: "📝",
    label: "Paragraph",
  },
  {
    type: "heading",
    icon: "#️⃣",
    label: "Heading",
  },
  {
    type: "image",
    icon: "🖼",
    label: "Image",
  },
  {
    type: "callout",
    icon: "💡",
    label: "Callout",
  },
  {
    type: "list",
    icon: "📋",
    label: "Bullet List",
  },
  {
    type: "number",
    icon: "1️⃣",
    label: "Number List",
  },
  {
    type: "quote",
    icon: "❝",
    label: "Quote",
  },
  {
    type: "table",
    icon: "📊",
    label: "Table",
  },
];

export default function BlockToolbar({
  onAdd,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="block-picker">

      <button
        type="button"
        className="add-block-btn"
        onClick={() => setOpen(!open)}
      >
        ＋ Add Block
      </button>

      {open && (
        <div className="block-menu">

          {blocks.map((item) => (
            <button
              key={item.type}
              type="button"
              className="block-option"
              onClick={() => {
                onAdd(item.type);
                setOpen(false);
              }}
            >
              <span>{item.icon}</span>

              {item.label}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}