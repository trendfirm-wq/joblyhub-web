import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
} from "lucide-react";
import RichTextBlock from "./RichTextBlock";
import HeadingBlock from "./HeadingBlock";
import ImageBlock from "./ImageBlock";
import CalloutBlock from "./CalloutBlock";
 import FloatingToolbar from "./FloatingToolbar";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import FormattingToolbar from "./FormattingToolbar";
export default function BlockEditor({
  blocks,
  setBlocks,
}) {

  const [token, setToken] = useState("");
const [activeEditor, setActiveEditor] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }
}, []);
  const updateBlock = (index, block) => {
    const copy = [...blocks];
    copy[index] = block;
    setBlocks(copy);
  };

  const addBlock = (type) => {

    let data = {};

    switch (type) {
case "richtext":

data = {
    content: "<p><br></p>",
};

break;

      case "heading":
        data = {
          text: "",
        };
        break;

      case "image":
        data = {
          url: "",
          caption: "",
        };
        break;

      case "callout":
        data = {
          variant: "info",
          title: "",
          body: "",
        };
        break;

      case "list":
        data = {
          items: [""],
        };
        break;

      case "number":
        data = {
          items: [""],
        };
        break;

      case "quote":
        data = {
          quote: "",
          author: "",
        };
        break;

      case "table":
        data = {
          columns: ["", ""],
          rows: [["", ""]],
        };
        break;

      default:
        data = {
          text: "",
        };
    }

    setBlocks([
      ...blocks,
      {
       id: uuid(),
        type,
        data,
      },
    ]);
  };

  const deleteBlock = (index) => {

    const copy = [...blocks];

    copy.splice(index, 1);

    if (copy.length === 0) {

   copy.push({
  id: uuid(),
  type: "richtext",
  data: {
    content: "<p><br></p>",
  },
});

    }

    setBlocks(copy);

  };

  const moveUp = (index) => {

    if (index === 0) return;

    const copy = [...blocks];

    [copy[index - 1], copy[index]] =
      [copy[index], copy[index - 1]];

    setBlocks(copy);

  };

  const moveDown = (index) => {

    if (index === blocks.length - 1) return;

    const copy = [...blocks];

    [copy[index + 1], copy[index]] =
      [copy[index], copy[index + 1]];

    setBlocks(copy);

  };
const duplicateBlock = (index) => {

  const copy = [...blocks];

  const cloned = {
    ...copy[index],
    id: uuid(),
    data: JSON.parse(
      JSON.stringify(copy[index].data)
    ),
  };

  copy.splice(index + 1, 0, cloned);

  setBlocks(copy);

};
  const renderBlock = (block, index) => {

    switch (block.type) {

      case "heading":
        return (
          <HeadingBlock
            block={block}
            onChange={(value) =>
              updateBlock(index, value)
            }
          />
        );

      case "image":
        return (
          <ImageBlock
  block={block}
  onChange={(value) =>
    updateBlock(index, value)
  }
/>
        );

      case "callout":
        return (
          <CalloutBlock
            block={block}
            onChange={(value) =>
              updateBlock(index, value)
            }
          />
        );

      case "richtext":

default:
    return (
        <RichTextBlock
            block={block}
            onChange={(value)=>
                updateBlock(index,value)
            }
            onFocus={setActiveEditor}
        />
    );

    }

  };

  return (

   <>
{activeEditor && (
    <FormattingToolbar
        editor={activeEditor}
    />
)}

     {blocks.map((block, index) => (

  <div
    key={block.id}
    className="editor-card"
  >

    {/* LEFT ACTION BAR */}

    <div className="block-actions-vertical">

      <button
        type="button"
        onClick={() => moveUp(index)}
        title="Move Up"
      >
        <ArrowUp size={18} />
      </button>

      <button
        type="button"
        onClick={() => moveDown(index)}
        title="Move Down"
      >
        <ArrowDown size={18} />
      </button>

      <button
        type="button"
        onClick={() => duplicateBlock(index)}
        title="Duplicate"
      >
        <Copy size={18} />
      </button>

      <button
        type="button"
        onClick={() => deleteBlock(index)}
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

    </div>

    {/* EDITOR */}

    <div className="block-content">

      {renderBlock(block, index)}

    </div>

  </div>

))}
     <FloatingToolbar
  onAdd={addBlock}
/>

    </>

  );

}