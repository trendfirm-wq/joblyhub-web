"use client";

export default function ToolbarButton({
  onClick,
  active = false,
  title,
  children,
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`editor-btn ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}