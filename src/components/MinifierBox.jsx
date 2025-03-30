import { FaCopy, FaDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MinifierBox = ({ title, value, onChange, readOnly, showButtons }) => {
  const copyToClipboard = async () => {
    console.log("Copy button clicked"); // Debug log

    try {
      await navigator.clipboard.writeText(value);
      console.log("Copied successfully"); // Debug log
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Clipboard copy error:", error);
      toast.error("Failed to copy!");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "minified_code.txt";
    link.click();
  };

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <textarea
          className="w-full h-40 p-2 bg-gray-700 text-[var(--clr-light-a0)] rounded-lg resize-none"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={
            readOnly
              ? "Minified code will appear here..."
              : "Paste your code here..."
          }
        />
        {showButtons && (
          <div className="flex gap-4 mt-2">
            <button
              className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={copyToClipboard}
            >
              <FaCopy /> Copy
            </button>
            <button
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
              onClick={downloadFile}
            >
              <FaDownload /> Download
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MinifierBox;
