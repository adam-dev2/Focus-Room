import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { $getSelection } from "lexical";

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  // Update toolbar state based on current selection
  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if (selection !== null) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return (
    <div className="mb-2 flex gap-2 border-b pb-2">
      <button 
        className={`px-3 py-1 rounded cursor-pointer transition-colors ${
          isBold 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <strong>B</strong>
      </button>
      <button 
        className={`px-3 py-1 rounded cursor-pointer transition-colors ${
          isItalic 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <em>I</em>
      </button>
      <button 
        className={`px-3 py-1 rounded cursor-pointer transition-colors ${
          isUnderline 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <u>U</u>
      </button>
    </div>
  );
}

export default Toolbar