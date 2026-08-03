"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Highlighter,
  CheckSquare,
   Table2,
  Columns2,
  Rows2,
  Trash2,
} from "lucide-react";

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write here...",
}) {
  const editor = useEditor({
    immediatelyRender: false,

   extensions: [
  StarterKit,

  Underline,

  Highlight,

  Image,

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  Table.configure({
    resizable: true,
  }),

  TableRow,

  TableHeader,

  TableCell,

  Placeholder.configure({
    placeholder,
  }),

  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
],

    content: value || "",

    editorProps: {
      attributes: {
        class:
          "rich-editor-input prose max-w-none min-h-[300px] focus:outline-none",
      },
    },

    onBlur: ({ editor }) => {
      const html = editor.getHTML();

      if (html !== value) {
        onChange(html);
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.isFocused) return;

    const html = value || "";

    if (editor.getHTML() !== html) {
      editor.commands.setContent(html, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  const keepFocus = (e) => {
    e.preventDefault();
  };

  const addLink = () => {
    const previous =
      editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter URL",
      previous
    );

    if (url === null) return;

    if (url.trim() === "") {
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
const insertTable = () => {
  editor
    .chain()
    .focus()
    .insertTable({
      rows: 3,
      cols: 3,
      withHeaderRow: true,
    })
    .run();
};

const addColumn = () => {
  editor.chain().focus().addColumnAfter().run();
};

const addRow = () => {
  editor.chain().focus().addRowAfter().run();
};

const deleteColumn = () => {
  editor.chain().focus().deleteColumn().run();
};

const deleteRow = () => {
  editor.chain().focus().deleteRow().run();
};

const deleteTable = () => {
  editor.chain().focus().deleteTable().run();
};
  return (
    <div className="rich-editor-box">
      <div className="rich-toolbar">

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <UnderlineIcon size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
        >
          <Heading1 size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          <Heading2 size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          <ListOrdered size={18} />
        </button>
        <button
  type="button"
  onMouseDown={keepFocus}
  onClick={insertTable}
  title="Insert Table"
>
  <Table2 size={18} />
</button>

<button
  type="button"
  onMouseDown={keepFocus}
  onClick={addColumn}
  title="Add Column"
>
  <Columns2 size={18} />
</button>

<button
  type="button"
  onMouseDown={keepFocus}
  onClick={addRow}
  title="Add Row"
>
  <Rows2 size={18} />
</button>

<button
  type="button"
  onMouseDown={keepFocus}
  onClick={deleteColumn}
  title="Delete Column"
>
  <Trash2 size={16} />
</button>

<button
  type="button"
  onMouseDown={keepFocus}
  onClick={deleteRow}
  title="Delete Row"
>
  <Trash2 size={16} />
</button>

<button
  type="button"
  onMouseDown={keepFocus}
  onClick={deleteTable}
  title="Delete Table"
>
  <Trash2 size={18} />
</button>
        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleTaskList()
              .run()
          }
        >
          <CheckSquare size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
        >
          <Quote size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight()
              .run()
          }
        >
          <Highlighter size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={addLink}
        >
          <LinkIcon size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <Undo size={18} />
        </button>

        <button
          type="button"
          onMouseDown={keepFocus}
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <Redo size={18} />
        </button>

      </div>

      <EditorContent
        editor={editor}
      />
    </div>
  );
}