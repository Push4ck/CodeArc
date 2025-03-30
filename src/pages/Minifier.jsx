import { useState } from "react";
import { minify as minifyHTML } from "html-minifier-terser";
import * as csso from "csso";
import { minify as minifyJS } from "terser";
import { FaCopy, FaDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Minifier = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyCode = async () => {
    try {
      let minified = "";
      if (activeTab === "html") {
        minified = await minifyHTML(input, { collapseWhitespace: true });
      } else if (activeTab === "css") {
        minified = csso.minify(input).css;
      } else if (activeTab === "js") {
        const result = await minifyJS(input);
        minified = result.code || "Error in JS code";
      }
      setOutput(minified);
      toast.success(`${activeTab.toUpperCase()} minified successfully!`);
    } catch (error) {
      setOutput("Minification error: " + error.message);
      toast.error("Minification failed!");
    }
  };

  const copyToClipboard = async () => {
    if (!output) {
      toast.error("Nothing to copy!");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy!");
      console.error("Clipboard copy error:", error);
    }
  };

  const downloadFile = () => {
    if (!output) {
      toast.error("Nothing to download!");
      return;
    }
    const fileExtension =
      activeTab === "html" ? "html" : activeTab === "css" ? "css" : "js";
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `minified.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("File downloaded!");
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
