import { useState } from "react";

export default function LinkModal({
  open,
  onClose,
  onInsert,
}) {

  const [url, setUrl] = useState("");

  if (!open) return null;

  const submit = () => {

    if (!url.trim()) return;

    onInsert(url);

    setUrl("");

    onClose();

  };

  return (

    <div className="link-modal-backdrop">

      <div className="link-modal">

        <h3>Insert Link</h3>

        <input
          placeholder="https://..."
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
        />

        <div className="link-actions">

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="publish-btn"
            onClick={submit}
          >
            Insert
          </button>

        </div>

      </div>

    </div>

  );

}