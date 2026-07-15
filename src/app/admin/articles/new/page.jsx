"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import BlockEditor from "@/components/article-editor/BlockEditor";
import EditorHeader from "@/components/article-editor/EditorHeader";
import EditorCard from "@/components/article-editor/EditorCard";
import ArticlePreview from "@/components/article-editor/ArticlePreview";
import EditorTopBar from "@/components/article-editor/EditorTopBar";
import EditorDrawer from "@/components/article-editor/EditorDrawer";

import {
  FileText,
  Rocket,
  Upload,
  Trash2,
  RefreshCw,
  Eye,
  Pencil,
  Columns2,
} from "lucide-react";

import "@/styles/NewArticle.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function NewArticle() {
  useEffect(() => {
  document.title = "Articles | JoblyHub";
}, []);
const router = useRouter();
const { id } = useParams();

const [token, setToken] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }
}, []);
  const [saving, setSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
const [editorMode, setEditorMode] = useState("edit");
  const [view, setView] = useState("edit");
  const [articleId, setArticleId] = useState(null);
  const [form, setForm] = useState({
  title: '',
  excerpt: '',
  category: 'Career',
  coverImage: '',
  blocks: [
  {
    id: Date.now(),
    type: "richtext",
    data: {
      content: "<p><br></p>",
    },
  },
],
  status: 'draft',
});
useEffect(() => {
  if (id && token) {
    loadArticle();
  }
}, [id, token]);
const loadArticle=async()=>{

const res = await axios.get(
  `${API_URL}/articles/edit/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setArticleId(res.data._id);

setForm({

title:res.data.title,

excerpt:res.data.excerpt,

category:res.data.category,

coverImage:res.data.coverImage,

blocks:res.data.blocks,

status:res.data.status,

});

};
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const uploadImage = async e => {

    const file = e.target.files[0];

    if (!file) return;

    const body = new FormData();

    body.append('image', file);

    try {

       const res = await axios.post(
    `${API_URL}/articles/upload`,

            body,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );

        setForm({

            ...form,

            coverImage: res.data.image,

        });

    } catch (err) {

        console.log(err);

    }

};
const saveDraft = async () => {
  try {
    setSaving(true);

   let res;

if (articleId) {

  res = await axios.put(
    `${API_URL}/articles/${articleId}`,
    {
      ...form,
      status: "draft",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

} else {

  res = await axios.post(
    `${API_URL}/articles`,
    {
      ...form,
      status: "draft",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setArticleId(res.data._id);

}

    alert("Draft saved successfully.");

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Unable to save draft."
    );

  } finally {
    setSaving(false);
  }
};

 const saveArticle = async (e) => {

  if (e) e.preventDefault();

  try {

    setSaving(true);

    if (articleId) {

      await axios.put(
        `${API_URL}/articles/${articleId}`,
        {
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          coverImage: form.coverImage,
          blocks: form.blocks,
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } else {

      const res = await axios.post(
        `${API_URL}/articles`,
        {
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          coverImage: form.coverImage,
          blocks: form.blocks,
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArticleId(res.data._id);

    }

    alert("Article published successfully.");

   router.push("/admin/dashboard");

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Unable to publish article."
    );

  } finally {

    setSaving(false);

  }

};
  return (
    <div className="dashboard-page">

      <div className="article-editor">

 <EditorHeader
    saving={saving}
    onSaveDraft={saveDraft}
    onPublish={saveArticle}
/>
 <div className="editor-view-switch">

  <button
    type="button"
    className={
      view === "edit"
        ? "view-btn active"
        : "view-btn"
    }
    onClick={() => setView("edit")}
  >
    <Pencil size={18} />
    Edit
  </button>

 <button
  type="button"
  className={
    view === "split"
      ? "view-btn active"
      : "view-btn"
  }
  onClick={() => setView("split")}
>
  <Columns2 size={18}/>
  Split
</button>

  <button
    type="button"
    className={
      view === "preview"
        ? "view-btn active"
        : "view-btn"
    }
    onClick={() => setView("preview")}
  >
    <Eye size={18} />
    Preview
  </button>

</div>
<EditorTopBar
  onOpenMenu={() => setMenuOpen(true)}
/>

<EditorDrawer
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  setMode={setEditorMode}
/>
<form onSubmit={saveArticle}>

  <div
   className={`editor-layout ${view}`}
  >

    {/* ================= LEFT SIDE ================= */}

<div
  className={`editor-pane ${view}`}
>
      <EditorCard title="Article Information">

        {/* EVERYTHING you currently have inside your
            Article Information card stays here */}

        <div className="form-group">
          <label>Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">

          <label>Excerpt</label>

          <textarea
            rows={3}
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Category</label>

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Career, AI, Remote Work..."
              className="category-input"
            />

            <small className="field-help">
              Create any category you need.
            </small>

          </div>

          <div className="status-switch">

            <button
              type="button"
              className={
                form.status === "draft"
                  ? "status-pill active"
                  : "status-pill"
              }
              onClick={() =>
                setForm({
                  ...form,
                  status: "draft",
                })
              }
            >
              <FileText size={18} />
              <span>Draft</span>
            </button>

            <button
              type="button"
              className={
                form.status === "published"
                  ? "status-pill active"
                  : "status-pill"
              }
              onClick={() =>
                setForm({
                  ...form,
                  status: "published",
                })
              }
            >
              <Rocket size={18} />
              <span>Published</span>
            </button>

          </div>

        </div>

        <div className="form-group">

          <label>Cover Image</label>

          <label className="upload-box">

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={uploadImage}
            />

            <div className="upload-content">

              <span className="upload-icon">
                <Upload size={28} />
              </span>

              <div>

                <h4>Upload Cover Image</h4>

                <p>
                  Click to browse or drag an image here
                </p>

              </div>

            </div>

          </label>

          {form.coverImage && (

            <div className="cover-preview-card">

              <img
                src={form.coverImage}
                alt=""
                className="cover-preview"
              />

              <div className="cover-preview-actions">

                <label className="image-action-btn replace-btn">

                  <RefreshCw size={18} />

                  <span>Replace</span>

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                  />

                </label>

                <button
                  type="button"
                  className="image-action-btn delete-btn"
                  onClick={() =>
                    setForm({
                      ...form,
                      coverImage: "",
                    })
                  }
                >
                  <Trash2 size={18} />

                  <span>Delete</span>

                </button>

              </div>

            </div>

          )}

        </div>

      </EditorCard>

      <EditorCard title="Article Content">

        <BlockEditor
          blocks={form.blocks}
          setBlocks={(blocks) =>
            setForm({
              ...form,
              blocks,
            })
          }
        />

      </EditorCard>

    </div>

    {/* ================= RIGHT SIDE ================= */}
<div
  className={`preview-pane ${view}`}
>

  <ArticlePreview
    title={form.title}
    excerpt={form.excerpt}
    category={form.category}
    coverImage={form.coverImage}
    blocks={form.blocks}
  />

</div>

  </div>

  
</form>
</div>
    </div>
  );
}