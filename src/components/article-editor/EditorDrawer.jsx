export default function EditorDrawer({

  open,

  onClose,

  setMode,

}) {

  if (!open) return null;

  return (

    <div className="editor-overlay">

      <div className="editor-drawer">

        <button
          onClick={()=>{
            setMode("edit");
            onClose();
          }}
        >
          ✏ Edit
        </button>

        <button
          onClick={()=>{
            setMode("preview");
            onClose();
          }}
        >
          👁 Preview
        </button>

        <button
          onClick={()=>{
            setMode("split");
            onClose();
          }}
        >
          ✂ Split View
        </button>

        <button
          onClick={()=>{
            setMode("blocks");
            onClose();
          }}
        >
          🧩 Blocks
        </button>

      </div>

    </div>

  );

}