"use client";

import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Undo,
  Redo,
} from "lucide-react";

const Btn = ({
  active,
  title,
  onClick,
  children,
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`editor-btn ${active ? " active" : ""}`}
  >
    {children}
  </button>
);

const Group = ({ children }) => (
  <div className="editor-group">
    {children}
  </div>
);

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const insertImage = () => {
    const url = window.prompt("Image URL");

    if (!url?.trim()) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  const insertLink = () => {
    const previous =
      editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter URL",
      previous
    );

    if (url === null) return;

    if (!url.trim()) {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.startsWith("http")
          ? url
          : `https://${url}`,
      })
      .run();
  };

  return (
    <div className="editor-toolbar">

      <Group>

        <Btn
          title="Undo"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <Undo size={18} />
        </Btn>

        <Btn
          title="Redo"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <Redo size={18} />
        </Btn>

      </Group>

      <Group>

        <Btn
          active={editor.isActive("bold")}
          title="Bold"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold size={18} />
        </Btn>

        <Btn
          active={editor.isActive("italic")}
          title="Italic"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic size={18} />
        </Btn>

        <Btn
          active={editor.isActive("underline")}
          title="Underline"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <Underline size={18} />
        </Btn>

      </Group>

      <Group>

        <Btn
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 1,
            }).run()
          }
        >
          <Heading1 size={18} />
        </Btn>

        <Btn
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
        >
          <Heading2 size={18} />
        </Btn>

        <Btn
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 3,
            }).run()
          }
        >
          <Heading3 size={18} />
        </Btn>

      </Group>

      <Group>

        <Btn
          active={editor.isActive("bulletList")}
          title="Bullet List"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={18} />
        </Btn>

        <Btn
          active={editor.isActive("orderedList")}
          title="Numbered List"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={18} />
        </Btn>

        <Btn
          active={editor.isActive("blockquote")}
          title="Quote"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote size={18} />
        </Btn>

      </Group>

      <Group>

        <Btn
          title="Link"
          onClick={insertLink}
        >
          <Link size={18} />
        </Btn>

        <Btn
          title="Image"
          onClick={insertImage}
        >
          <Image size={18} />
        </Btn>

      </Group>

    </div>
  );
}