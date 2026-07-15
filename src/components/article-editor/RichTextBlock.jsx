import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextBlock({
  block,
  onChange,
  onFocus,
}) {

  const editor = useEditor({

    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: block.data.content || "<p><br></p>",

    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },

    onCreate({ editor }) {
      onFocus?.(editor);
    },

    onFocus({ editor }) {
      onFocus?.(editor);
    },

    onUpdate({ editor }) {
      onChange({
        ...block,
        data: {
          ...block.data,
          content: editor.getHTML(),
        },
      });
    },

  });

  if (!editor) return null;

  return (
    <div className="rich-editor">
      <EditorContent editor={editor} />
    </div>
  );

}