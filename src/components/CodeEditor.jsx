import React, { useState, useRef, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";

import draculaTheme from "../themes/dracula-theme.json";
import tokyoNightStormTheme from "../themes/tokyo-night-storm-theme.json";
import shadeOfPurple from "../themes/shade-of-purple-theme.json";

const themes = {
  myDracula: draculaTheme,
  myTokyoNightStorm: tokyoNightStormTheme,
  myShadeOfPurple: shadeOfPurple,
};

const CodeEditor = ({ language, value, onChange }) => {
  const editorRef = useRef(null);
  const formatTimeout = useRef(null);
  const monacoRef = useRef(null);
  const dropdownRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState("myDracula");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleBeforeMount = (monaco) => {
    monacoRef.current = monaco;
    try {
      Object.keys(themes).forEach((themeKey) => {
        const themeData = themes[themeKey];
        if (!themeData.rules || !themeData.colors) {
          console.error(`Theme ${themeKey} is missing required properties!`);
          return;
        }

        themeData.rules.forEach((rule, index) => {
          console.log(`Theme: ${themeKey}, Rule ${index}:`, rule); // Log each rule
        });

        console.log(`Theme: ${themeKey}, Colors:`, themeData.colors); // Log all colors

        monaco.editor.defineTheme(themeKey, {
          base: "vs-dark",
          inherit: true,
          rules: themeData.rules || [],
          colors: themeData.colors || {},
        });
      });
    } catch (error) {
      console.error("Error defining theme:", error);
    }
  };

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    monaco.editor.setTheme(selectedTheme);
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

  const changeTheme = (themeKey) => {
    setSelectedTheme(themeKey);
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(themeKey);
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex items-center justify-end w-full gap-4 top-3 right-3">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="z-10 bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] p-2 rounded hover:bg-[var(--clr-surface-a0)] transition cursor-pointer flex gap-2 text-xs items-center"
        >
          <FaCopy size={12} /> Copy
        </button>

        {/* Theme Dropdown */}
        <div
          className="z-10"
          ref={dropdownRef}
        >
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] rounded hover:bg-[var(--clr-surface-a0)] transition cursor-pointer flex items-center gap-2 px-2 py-1"
          >
            {selectedTheme.replace(/my/g, "")}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[var(--clr-dark-a0)] rounded shadow-lg overflow-hidden">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => changeTheme(themeKey)}
                  className="block w-full text-left px-4 py-2 text-[var(--clr-light-a0)] hover:bg-[var(--clr-surface-a0)] cursor-pointer"
                >
                  {themeKey.replace(/my/g, "").replace(/_/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <Editor
        height="100%"
        language={language}
        value={value}
        onMount={handleEditorMount}
        beforeMount={handleBeforeMount}
        onChange={onChange}
        theme={selectedTheme}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
