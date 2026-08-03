export default function EditorStats({
    editor,
}) {

    if (!editor) return null;

    const words =
        editor.storage.characterCount.words();

    const chars =
        editor.storage.characterCount.characters();

    const readingTime =
        Math.max(
            1,
            Math.ceil(words / 220)
        );

    return (

        <div className="editor-stats">

            <span>{words} words</span>

            <span>{chars} characters</span>

            <span>{readingTime} min read</span>

        </div>

    );

}