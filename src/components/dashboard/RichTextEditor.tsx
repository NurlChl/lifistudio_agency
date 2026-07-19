"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { ButtonExtension } from "./ButtonExtension";
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, ImageIcon, Link as LinkIcon, Undo, Redo, Code2, Video as YoutubeIcon, MousePointerClick, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MediaPicker from "./MediaPicker";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// ─── Custom Modal Component ───────────────────────────────────────────────────
interface ModalField {
  key: string;
  label: string;
  placeholder?: string;
  type?: string;
}

interface EditorModalProps {
  title: string;
  fields: ModalField[];
  onConfirm: (values: Record<string, string>) => void;
  onClose: () => void;
  confirmLabel?: string;
}

function EditorModal({ title, fields, onConfirm, onClose, confirmLabel = "Insert" }: EditorModalProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.key, ""]))
  );
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm(values);
  }

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-stone-100 w-full max-w-md overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="font-heading font-semibold text-stone-900 text-base">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {fields.map((field, i) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                {field.label}
              </label>
              <input
                ref={i === 0 ? firstRef : undefined}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                value={values[field.key]}
                onChange={(e) => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all"
              />
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-accent-600 transition-all duration-200"
            >
              {confirmLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal State Types ────────────────────────────────────────────────────────
type ActiveModal = "link" | "youtube" | "button" | null;

// ─── Main Editor ──────────────────────────────────────────────────────────────
export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent-600 underline underline-offset-2",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: "w-full aspect-video rounded-xl overflow-hidden my-6",
        },
      }),
      ButtonExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-stone prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  // Sync external content changes into editor (e.g. when initialData loads via useEffect)
  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    // Only update if content actually differs to avoid cursor jumping
    if (content && content !== currentHTML && content !== "<p></p>") {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const handleImageInsert = (url: string | string[]) => {
    const imageUrl = Array.isArray(url) ? url[0] : url;
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const ToolbarButton = ({ onClick, isActive, disabled, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-all ${
        isActive
          ? "bg-stone-900 text-white"
          : "text-stone-500 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-stone-200 rounded-lg bg-white relative">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md shadow-sm rounded-t-lg">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <Code size={16} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-stone-200 mx-1" />

        <div className="flex bg-stone-100 rounded-lg p-0.5">
          {[1, 2, 3, 4, 5, 6].map((level: any) => {
            const Icon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level - 1];
            return (
              <ToolbarButton
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                isActive={editor.isActive("heading", { level })}
              >
                <Icon size={16} />
              </ToolbarButton>
            );
          })}
        </div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Code2 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-stone-200 mx-1" />

        {/* Image */}
        <ToolbarButton onClick={() => setShowMediaPicker(true)}>
          <ImageIcon size={16} />
        </ToolbarButton>

        {/* Link — custom modal */}
        <ToolbarButton
          onClick={() => setActiveModal("link")}
          isActive={editor.isActive("link")}
        >
          <LinkIcon size={16} />
        </ToolbarButton>

        {/* YouTube — custom modal */}
        <ToolbarButton
          onClick={() => setActiveModal("youtube")}
          isActive={editor.isActive("youtube")}
        >
          <YoutubeIcon size={16} />
        </ToolbarButton>

        {/* Button — custom modal */}
        <ToolbarButton
          onClick={() => setActiveModal("button")}
          isActive={editor.isActive("buttonExtension")}
        >
          <MousePointerClick size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-stone-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* ── Media Picker Modal ── */}
      {showMediaPicker && (
        <MediaPicker
          onSelect={handleImageInsert}
          onClose={() => setShowMediaPicker(false)}
          multiple={false}
        />
      )}

      {/* ── Link Modal ── */}
      {activeModal === "link" && (
        <EditorModal
          title="Insert Link"
          confirmLabel="Insert Link"
          fields={[
            { key: "url", label: "URL", placeholder: "https://example.com", type: "url" },
            { key: "text", label: "Link Text (opsional)", placeholder: "Klik di sini" },
          ]}
          onConfirm={({ url, text }) => {
            setActiveModal(null);
            if (!url) return;
            if (text && editor.state.selection.empty) {
              editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
            } else {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── YouTube Modal ── */}
      {activeModal === "youtube" && (
        <EditorModal
          title="Insert YouTube Video"
          confirmLabel="Embed Video"
          fields={[
            { key: "url", label: "YouTube URL", placeholder: "https://www.youtube.com/watch?v=...", type: "url" },
          ]}
          onConfirm={({ url }) => {
            setActiveModal(null);
            if (!url) return;
            editor.commands.setYoutubeVideo({
              src: url,
              width: Math.max(320, parseInt(window.innerWidth.toString()) - 40),
              height: Math.max(180, parseInt(window.innerWidth.toString()) * 0.5625),
            });
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── Button Modal ── */}
      {activeModal === "button" && (
        <EditorModal
          title="Insert Button"
          confirmLabel="Insert Button"
          fields={[
            { key: "text", label: "Teks Button", placeholder: "Visit Website" },
            { key: "url", label: "URL / Link", placeholder: "https://example.com", type: "url" },
          ]}
          onConfirm={({ text, url }) => {
            setActiveModal(null);
            if (!text || !url) return;
            editor.commands.insertButton({ href: url, text });
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
