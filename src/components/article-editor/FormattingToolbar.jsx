import { useState } from "react";
import {
  Type,
  Heading,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Sparkles,
  Heading1 as H1,
  Heading2 as H2,
} from "lucide-react";

export default function FormattingToolbar({ editor }) {
  const [active, setActive] = useState("text");

  if (!editor) return null;

  const sections = [
    {
      id: "text",
      icon: <Type size={20} />,
      title: "Text",
    },
    {
      id: "heading",
      icon: <Heading size={20} />,
      title: "Headings",
    },
    {
      id: "list",
      icon: <List size={20} />,
      title: "Lists",
    },
    {
      id: "align",
      icon: <AlignLeft size={20} />,
      title: "Alignment",
    },
    {
      id: "link",
      icon: <Link2 size={20} />,
      title: "Links",
    },
    {
      id: "ai",
      icon: <Sparkles size={20} />,
      title: "AI",
    },
  ];

  return (
    <div className="format-shell">

      {/* LEFT RAIL */}

      <div className="format-rail">

        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={
              active === section.id
                ? "rail-btn active"
                : "rail-btn"
            }
            onClick={() => setActive(section.id)}
          >
            {section.icon}
          </button>
        ))}

      </div>

      {/* FLOATING PANEL */}

      <div className="format-panel">

        <div className="panel-title">

          {sections.find(s => s.id === active)?.title}

        </div>

        <div className="panel-body">

          {active === "text" && (

  <div className="tool-grid">

    <button
      type="button"
      className={
        editor.isActive("bold")
          ? "tool-btn active"
          : "tool-btn"
      }
      onClick={() =>
        editor.chain().focus().toggleBold().run()
      }
    >
      <Type size={18} />
      <span>Bold</span>
    </button>

    <button
      type="button"
      className={
        editor.isActive("italic")
          ? "tool-btn active"
          : "tool-btn"
      }
      onClick={() =>
        editor.chain().focus().toggleItalic().run()
      }
    >
      <span style={{fontStyle:"italic"}}>I</span>
      <span>Italic</span>
    </button>

    <button
      type="button"
      className={
        editor.isActive("underline")
          ? "tool-btn active"
          : "tool-btn"
      }
      onClick={() =>
        editor.chain().focus().toggleUnderline().run()
      }
    >
      <span style={{textDecoration:"underline"}}>U</span>
      <span>Underline</span>
    </button>

    <button
      type="button"
      className={
        editor.isActive("highlight")
          ? "tool-btn active"
          : "tool-btn"
      }
      onClick={() =>
        editor.chain().focus().toggleHighlight().run()
      }
    >
      <Sparkles size={18}/>
      <span>Highlight</span>
    </button>

  </div>

)}

          {active === "heading" && (
           <div className="tool-grid">

<button
type="button"
className={
editor.isActive("heading",{level:1})
?"tool-btn active"
:"tool-btn"
}
onClick={()=>
editor
.chain()
.focus()
.toggleHeading({level:1})
.run()
}
>

<H1 size={18}/>

<span>Heading 1</span>

</button>

<button
type="button"
className={
editor.isActive("heading",{level:2})
?"tool-btn active"
:"tool-btn"
}
onClick={()=>
editor
.chain()
.focus()
.toggleHeading({level:2})
.run()
}
>

<H2 size={18}/>

<span>Heading 2</span>

</button>

</div>
          )}

          {active === "list" && (
         <div className="tool-grid">

<button

type="button"

className={
editor.isActive("bulletList")
?"tool-btn active"
:"tool-btn"
}

onClick={()=>

editor
.chain()
.focus()
.toggleBulletList()
.run()

}

>

<List size={18}/>

<span>Bullet List</span>

</button>

<button

type="button"

className={
editor.isActive("orderedList")
?"tool-btn active"
:"tool-btn"
}

onClick={()=>

editor
.chain()
.focus()
.toggleOrderedList()
.run()

}

>

<ListOrdered size={18}/>

<span>Number List</span>

</button>

</div>
          )}

          {active === "align" && (
         <div className="tool-grid">

<button

className="tool-btn"

onClick={()=>

editor
.chain()
.focus()
.setTextAlign("left")
.run()

}

>

<AlignLeft size={18}/>

<span>Left</span>

</button>

<button

className="tool-btn"

onClick={()=>

editor
.chain()
.focus()
.setTextAlign("center")
.run()

}

>

<AlignCenter size={18}/>

<span>Center</span>

</button>

<button

className="tool-btn"

onClick={()=>

editor
.chain()
.focus()
.setTextAlign("right")
.run()

}

>

<AlignRight size={18}/>

<span>Right</span>

</button>

</div>
          )}

          {active === "link" && (
            <p>Link tools go here.</p>
          )}

          {active === "ai" && (
            <p>AI tools coming soon.</p>
          )}

        </div>

      </div>

    </div>
  );
}