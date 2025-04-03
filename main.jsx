import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "Start writing..." }] },
  ]);

  const toggleMark = (format) => {
    const marks = Editor.marks(editor) || {};
    const isActive = marks[format];

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const changeFontSize = (size) => {
    Editor.addMark(editor, "fontSize", size);
  };

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    if (leaf.fontSize) children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>;

    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => toggleMark("bold")}>Bold</button>
        <button onClick={() => toggleMark("italic")}>Italic</button>
        <button onClick={() => toggleMark("underline")}>Underline</button>
        <select onChange={(e) => changeFontSize(e.target.value)}>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>
      </div>

      {/* Slate Editor */}
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          renderLeaf={renderLeaf}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "200px",
          }}
          placeholder="Type something..."
        />
      </Slate>
    </div>
  );
};

export default TextEditor;