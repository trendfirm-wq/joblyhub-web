"use client";

import {
  ArrowLeft,
  FileText,
  Rocket,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function EditorHeader({
  saving,
  onSaveDraft,
  onPublish,
}) {
  const router = useRouter();

  return (
    <div className="editor-header">
      <div className="editor-header-left">
        <button
          type="button"
          className="icon-btn"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1>Create Article</h1>
          <p>Write and publish professional content.</p>
        </div>
      </div>

      <div className="editor-header-right">
        <button
          type="button"
          className="draft-btn"
          onClick={onSaveDraft}
          disabled={saving}
        >
          <FileText size={18} />
          <span>
            {saving ? "Saving..." : "Save Draft"}
          </span>
        </button>

        <button
          type="button"
          className="publish-btn"
          onClick={onPublish}
          disabled={saving}
        >
          <Rocket size={18} />
          <span>
            {saving ? "Publishing..." : "Publish"}
          </span>
        </button>
      </div>
    </div>
  );
}