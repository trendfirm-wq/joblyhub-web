import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

export const editorExtensions = (placeholder) => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),

  Underline,

  Highlight.configure({
    multicolor: true,
  }),

  TextStyle,

  Color,

  Typography,

  HorizontalRule,

  Image.configure({
    inline: false,
    allowBase64: true,
  }),

  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),

  Placeholder.configure({
    placeholder,
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  Table.configure({
    resizable: true,
    lastColumnResizable: true,
  }),

  TableRow,

  TableHeader,

  TableCell,

  CharacterCount,
];