export default function EditorCard({
  title,
  children,
}) {
  return (
    <section className="editor-shell-card">

      <div className="editor-shell-title">
        {title}
      </div>

      <div className="editor-shell-body">
        {children}
      </div>

    </section>
  );
}