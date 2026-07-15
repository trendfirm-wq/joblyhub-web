import axios from "axios";

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
    <div className="editor-block">

      <label>Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {block.data.url && (
        <img
          src={block.data.url}
          alt=""
          className="editor-image-preview"
        />
      )}

      <input
        placeholder="Image caption..."
        value={block.data.caption}
        onChange={(e)=>
          onChange({
            ...block,
            data:{
              ...block.data,
              caption:e.target.value,
            },
          })
        }
      />

    </div>
  );
}