import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
} from "lucide-react";
import { useState } from "react";
import LinkModal from "./LinkModal";
export default function RichTextToolbar({ editor }) {
  if (!editor) return null;
const [showLink,setShowLink]=useState(false);
  const tools = [
    {
      icon: <Bold size={18} />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <Italic size={18} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <Underline size={18} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },

    {
      icon: <Heading1 size={18} />,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },

    {
      icon: <Heading2 size={18} />,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },

    {
      icon: <List size={18} />,
      action: () =>
        editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },

  {
  icon: <ListOrdered size={18} />,
  action: () =>
    editor.chain().focus().toggleOrderedList().run(),
  active: editor.isActive("orderedList"),
},

{
  icon: <Link size={18} />,
  action: () => setShowLink(true),
  active: editor.isActive("link"),
},

{
  icon: <AlignLeft size={18} />,
  action: () =>
    editor.chain().focus().setTextAlign("left").run(),
},

    {
      icon: <AlignCenter size={18} />,
      action: () =>
        editor.chain().focus().setTextAlign("center").run(),
    },

    {
      icon: <AlignRight size={18} />,
      action: () =>
        editor.chain().focus().setTextAlign("right").run(),
    },

    {
      icon: <Highlighter size={18} />,
      action: () =>
        editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
    },

    {
      icon: <Undo2 size={18} />,
      action: () =>
        editor.chain().focus().undo().run(),
    },

    {
      icon: <Redo2 size={18} />,
      action: () =>
        editor.chain().focus().redo().run(),
    },
  ];
<LinkModal

    open={showLink}

    onClose={()=>setShowLink(false)}

    onInsert={(url)=>{

        editor
            .chain()
            .focus()
            .setLink({
                href:url,
            })
            .run();

    }}

/>
  return (
    <div className="rich-toolbar">

      {tools.map((tool, index) => (

        <button
          key={index}
          type="button"
          className={
            tool.active
              ? "toolbar-btn active"
              : "toolbar-btn"
          }
          onClick={tool.action}
        >
          {tool.icon}
        </button>

      ))}

    </div>
  );
}