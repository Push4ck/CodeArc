import React, { useRef, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, onChange }) => {
  const editorRef = useRef(null);
  const formatTimeout = useRef(null);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      try {
        editorRef.current.getAction("editor.action.formatDocument").run();
      } catch (error) {
        console.warn(
          "Auto-format failed or not supported for this language.",
          error
        );
      }
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    formatCode();
  };

  useEffect(() => {
    if (!value) return;
    if (formatTimeout.current) clearTimeout(formatTimeout.current);

    formatTimeout.current = setTimeout(() => {
      formatCode();
    }, 1000);

    return () => clearTimeout(formatTimeout.current);
  }, [value]);

  return (
    <>
      <div className="relative w-full h-full">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 bg-gray-700 text-[var(--clr-light-a0)] p-2 rounded shadow-lg hover:bg-gray-600 transition cursor-pointer"
        >
          <FaCopy size={18} />
        </button>

        <Editor
          height="100%"
          language={language}
          value={value}
          onMount={handleEditorMount}
          onChange={onChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
