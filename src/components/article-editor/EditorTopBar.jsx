import { Menu } from "lucide-react";

export default function EditorTopBar({
  onOpenMenu,
}) {
  return (
    <div className="editor-topbar">

      <button
        type="button"
        className="editor-menu-btn"
        onClick={onOpenMenu}
      >
        <Menu size={20} />

        <span>Editor Menu</span>

      </button>

    </div>
  );
}