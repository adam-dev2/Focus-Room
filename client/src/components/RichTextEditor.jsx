import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const MenuItem = ({ onClick, isActive, children, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 ${
        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
      }`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-1 mr-4">
        <MenuItem
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </MenuItem>
      </div>

      <div className="flex items-center gap-1 mr-4">
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </MenuItem>
      </div>

      <div className="flex items-center gap-1 mr-4">
        <MenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={18} />
        </MenuItem>
      </div>

      <div className="flex items-center gap-1 mr-4">
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight size={18} />
        </MenuItem>
      </div>

      <div className="flex items-center gap-1">
        <MenuItem
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          title="Undo"
        >
          <Undo size={18} />
        </MenuItem>
        
        <MenuItem
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          title="Redo"
        >
          <Redo size={18} />
        </MenuItem>
      </div>
    </div>
  );
};

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your story...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
  });

  const saveContent = useCallback(() => {
    if (editor) {
      const html = editor.getHTML();
      const json = editor.getJSON();
      
      console.log('HTML Content:', html);
      console.log('JSON Content:', json);
      
      // Here you would typically save to your backend
      // Example: saveToMongoDB(html, json);
      
      alert('Content saved! Check console for output.');
    }
  }, [editor]);

  const getWordCount = () => {
    if (!editor) return 0;
    const text = editor.state.doc.textContent;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
   <>
     <div className='h-full w-full m-10 mb-0 mt-0'>
      <div className="w-full my-6 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4">
          <h1 className="text-white text-2xl font-bold">QuickNote</h1>
          <p className="text-blue-100 text-sm">Create beautiful content with our Medium-style editor</p>
        </div>

        {/* Toolbar */}
        <MenuBar editor={editor} />

        {/* Editor */}
        <div className="relative">
          <EditorContent 
            editor={editor} 
            className="min-h-[45vh] focus-within:bg-gray-50 transition-colors duration-200"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Words: {getWordCount()}</span>
            <span>Characters: {editor?.state.doc.textContent.length || 0}</span>
          </div>
          
          <button
            onClick={saveContent}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            <Save size={16} />
            Save Content
          </button>
        </div>

      
      </div>
     </div>
   </>
  );
};

export default RichTextEditor;