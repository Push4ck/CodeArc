import { useState } from "react";
import { minify as minifyHTML } from "html-minifier-terser";
import * as csso from "csso";
import { minify as minifyJS } from "terser";
import { FaCopy, FaDownload } from "react-icons/fa";

const Minifier = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyCode = async () => {
    try {
      if (activeTab === "html") {
        const minified = await minifyHTML(input, { collapseWhitespace: true });
        setOutput(minified);
      } else if (activeTab === "css") {
        const minified = csso.minify(input).css;
        setOutput(minified);
      } else if (activeTab === "js") {
        const minified = await minifyJS(input);
        setOutput(minified.code || "Error in JS code");
      }
    } catch (error) {
      setOutput("Minification error: " + error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 p-6 bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] flex flex-col">
          <div className="flex space-x-4 mb-4">
            {["html", "css", "js"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setInput("");
                  setOutput("");
                }}
                className={`px-4 py-2 font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-[var(--clr-primary-a0)] text-[var(--clr-light-a0)]"
                    : "bg-[var(--clr-light-a0)] text-[var(--clr-dark-a0)] hover:bg-[var(--clr-light-a0)]/80"
                }`}
              >
                {tab.toUpperCase()} Editor
              </button>
            ))}
          </div>
          <textarea
            className="flex-1 p-3 bg-gray-700 text-[var(--clr-light-a0)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--clr-primary-a0)]"
            placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={minifyCode}
            className="mt-4 px-6 py-2 bg-[var(--clr-light-a0)] text-[var(--clr-dark-a0)] hover:bg-[var(--clr-primary-a0)] hover:text-[var(--clr-light-a0)] rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Minify {activeTab.toUpperCase()}
          </button>
        </div>

        <div className="w-1/2 p-6 bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] relative flex flex-col">
          <h2 className="text-xl font-bold mb-4">Minified Output</h2>
          <textarea
            className="flex-1 p-3 bg-gray-800 text-[var(--clr-light-a0)] rounded-lg resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-[var(--clr-primary-a0)] break-words whitespace-pre-wrap"
            placeholder="Minified output will appear here..."
            value={output}
            readOnly
          />
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={() => copyToClipboard(output)}
              className="bg-gray-700 text-[var(--clr-light-a0)] p-2 rounded shadow-lg hover:bg-gray-600 transition cursor-pointer"
            >
              <FaCopy size={18} />
            </button>
            <button
              onClick={() => downloadFile(output, `minified.${activeTab}`)}
              className="bg-gray-700 text-[var(--clr-light-a0)] p-2 rounded shadow-lg hover:bg-gray-600 transition cursor-pointer"
            >
              <FaDownload size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Minifier;
