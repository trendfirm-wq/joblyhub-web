export default function ToolbarSection({
  title,
  children,
}) {

  return (

    <div className="toolbar-section">

      <div className="toolbar-title">
        {title}
      </div>

      <div className="toolbar-group">
        {children}
      </div>

    </div>

  );

}