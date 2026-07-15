import axios from "axios";
import { Upload, Image as ImageIcon } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function ImageBlock({
  block,
  onChange,
  token,
}) {

  const uploadImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const body = new FormData();

    body.append("image", file);

    try {

      const { data } = await axios.post(
        `${API_URL}/articles/upload`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onChange({
        ...block,
        data: {
          ...block.data,
          url: data.image,
        },
      });

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="image-block">

      {block.data.url ? (

        <>

          <div className="editor-image-card">

            <img
              src={block.data.url}
              alt=""
              className="editor-image-preview"
            />

          </div>

          <label className="image-upload-btn">

            <Upload size={18} />

            <span>Replace Image</span>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={uploadImage}
            />

          </label>

        </>

      ) : (

        <label className="image-upload-area">

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={uploadImage}
          />

          <ImageIcon size={48} />

          <h3>Upload Image</h3>

          <p>
            Click to browse or drag an image here
          </p>

        </label>

      )}

      <div className="caption-box">

        <label>Image Caption</label>

        <textarea
          rows={2}
          placeholder="Describe this image..."
          value={block.data.caption || ""}
          onChange={(e) =>
            onChange({
              ...block,
              data: {
                ...block.data,
                caption: e.target.value,
              },
            })
          }
        />

      </div>

    </div>

  );

}