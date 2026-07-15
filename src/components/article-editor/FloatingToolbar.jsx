import {
  Type,
  Heading1,
  Image,
  MessageSquareQuote,
  List,
  Table,
  SquarePlus,
} from "lucide-react";

const items = [
 {
  type: "richtext",
  icon: <Type size={20} />,
  label: "Paragraph",
},
  {
    type: "heading",
    icon: <Heading1 size={20} />,
    label: "Heading",
  },
  {
    type: "image",
    icon: <Image size={20} />,
    label: "Image",
  },
  {
    type: "callout",
    icon: <SquarePlus size={20} />,
    label: "Callout",
  },
  {
    type: "list",
    icon: <List size={20} />,
    label: "Bullet List",
  },
  {
    type: "quote",
    icon: <MessageSquareQuote size={20} />,
    label: "Quote",
  },
  {
    type: "table",
    icon: <Table size={20} />,
    label: "Table",
  },
];

export default function FloatingToolbar({
  onAdd,
}) {
  return (
    <div className="floating-toolbar">

      {items.map((item) => (

        <button
          key={item.type}
          className="floating-tool"
          type="button"
          title={item.label}
          onClick={() => onAdd(item.type)}
        >
          {item.icon}
        </button>

      ))}

    </div>
  );
}