// Editor.js
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

// Import nodes
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import Toolbar from "./Toolbar";

function Placeholder() {
  return <div className="absolute top-2 left-2 text-gray-400">Enter text...</div>;
}

export default function TextEditor() {
  const editorConfig = {
    namespace: "MyEditor",
    theme: {
      paragraph: "mb-2",
      // FIXED: Move text formatting inside theme object
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline', // Using Tailwind's underline class
        strikethrough: 'line-through',
      },
    },
    // Register nodes
    nodes: [HeadingNode, QuoteNode, LinkNode, ListNode, ListItemNode],
    onError(error) {
      console.error('Lexical Error:', error);
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded p-4 min-h-[200px] relative bg-white">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[150px] pt-2" />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
          <Toolbar />
        <HistoryPlugin />
        <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
        <LinkPlugin />
      </div>
    </LexicalComposer>
  );
}