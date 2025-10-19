"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("heading", { level: 3 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        H3
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded text-sm font-bold ${
          editor.isActive("bold")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded text-sm italic ${
          editor.isActive("italic")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded text-sm underline ${
          editor.isActive("underline")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded text-sm line-through ${
          editor.isActive("strike")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        S
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("bulletList")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("orderedList")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        1. List
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Code */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("codeBlock")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        Code
      </button>

      {/* Link */}
      <button
        type="button"
        onClick={setLink}
        className={`px-3 py-1 rounded text-sm ${
          editor.isActive("link")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        Link
      </button>

      {/* Image */}
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-200"
      >
        Image
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Clear */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-200"
      >
        Clear
      </button>
    </div>
  );
};

export default function TextEditor({
  label,
  value = "",
  onChange,
  error,
  placeholder = "Write your content here...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value || "<p></p>",
    immediatelyRender: false, // ✅ THIS IS THE FIX
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <div
        className={`border rounded-lg overflow-hidden bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
