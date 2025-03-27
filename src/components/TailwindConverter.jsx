import React, { useState } from "react";
import { FaDownload, FaCopy } from "react-icons/fa";
import { TbArrowsLeftRight } from "react-icons/tb";

const extractClasses = (html) => {
  return html.match(/class="([^"]+)"/g) || [];
};

const convertTailwindToCSS = (inputHTML) => {
  let cssOutput = "";
  let classCounter = 1;
  let cleanedHTML = inputHTML;
  let classMappings = {};

  extractClasses(inputHTML).forEach((classAttr) => {
    const originalClass = classAttr.replace(/class="/, "").replace(/"/, "");
    const classes = originalClass.split(/\s+/);
    let newClassName = `custom-class-${classCounter++}`;
    let cssRules = "";

    classes.forEach((cls) => {
      if (cls.startsWith("bg-")) {
        cssRules += `background-color: ${convertTailwindColor(cls)};\n`;
      } else if (cls.startsWith("text-")) {
        cssRules += `color: ${convertTailwindColor(cls)};\n`;
      } else if (cls.startsWith("p-")) {
        cssRules += `padding: ${convertSpacing(cls)};\n`;
      } else if (cls.startsWith("m-")) {
        cssRules += `margin: ${convertSpacing(cls)};\n`;
      } else if (cls.startsWith("w-")) {
        cssRules += `width: ${convertWidth(cls)};\n`;
      } else if (cls.startsWith("h-")) {
        cssRules += `height: ${convertHeight(cls)};\n`;
      } else if (cls.startsWith("rounded-")) {
        cssRules += `border-radius: ${convertBorderRadius(cls)};\n`;
      }
    });

    if (cssRules) {
      classMappings[originalClass] = newClassName;
      cssOutput += `.${newClassName} {\n${cssRules}}\n\n`;
      cleanedHTML = cleanedHTML.replace(classAttr, `class="${newClassName}"`);
    }
  });

  return { cleanedHTML, cssOutput };
};

const convertTailwindColor = (cls) => {
  const colors = {
    "bg-red-500": "#ef4444",
    "bg-blue-500": "#3b82f6",
    "text-[var(--clr-light-a0)]": "white",
  };
  return colors[cls] || "inherit";
};

const convertSpacing = (cls) => {
  const spacing = {
    "p-4": "1rem",
    "m-4": "1rem",
  };
  return spacing[cls] || "auto";
};

const convertWidth = (cls) => {
  const width = {
    "w-full": "100%",
    "w-1/2": "50%",
  };
  return width[cls] || "auto";
};

const convertHeight = (cls) => {
  const height = {
    "h-screen": "100vh",
  };
  return height[cls] || "auto";
};

const convertBorderRadius = (cls) => {
  const radius = {
    "rounded-lg": "0.5rem",
  };
  return radius[cls] || "0";
};

const TailwindToCSSConverter = () => {
  const [tailwindCode, setTailwindCode] = useState("");
  const [convertedHTML, setConvertedHTML] = useState("");
  const [convertedCSS, setConvertedCSS] = useState("");

  const handleConvert = () => {
    const { cleanedHTML, cssOutput } = convertTailwindToCSS(tailwindCode);
    setConvertedHTML(cleanedHTML);
    setConvertedCSS(cssOutput || "/* No valid Tailwind classes found */");
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
      <div className="flex h-screen p-6 bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)] gap-6">
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg flex flex-col">
          <h2 className="text-xl font-bold mb-3">TailwindCSS Code</h2>
          <textarea
            className="flex-1 p-3 bg-gray-700 text-[var(--clr-light-a0)] rounded-lg resize-none overflow-auto h-60"
            value={tailwindCode}
            onChange={(e) => setTailwindCode(e.target.value)}
            placeholder='Enter Tailwind HTML here (e.g. <div class="bg-red-500 p-4">Hello</div>)'
          ></textarea>
          <button
            className="w-full mt-3 p-3 bg-[var(--clr-light-a0)] text-[var(--clr-dark-a0)] hover:bg-[var(--clr-primary-a0)] hover:text-[var(--clr-light-a0)] font-semibold cursor-pointer flex gap-2 items-center justify-center rounded-lg"
            onClick={handleConvert}
          >
            <TbArrowsLeftRight /> Convert
          </button>
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-lg flex-1 relative">
            <h2 className="text-xl font-bold mb-3">Converted HTML</h2>
            <pre className="w-full h-65 p-3 bg-gray-700 text-[var(--clr-light-a0)] rounded-lg overflow-auto break-words whitespace-pre-wrap">
              {convertedHTML || "Converted HTML will appear here"}
            </pre>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => copyToClipboard(convertedHTML)}
              >
                <FaCopy size={16} />
              </button>
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => downloadFile(convertedHTML, "converted.html")}
              >
                <FaDownload size={16} />
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg flex-1 relative">
            <h2 className="text-xl font-bold mb-3">Converted CSS</h2>
            <pre className="w-full h-65 p-3 bg-gray-700 text-[var(--clr-light-a0)] rounded-lg overflow-auto break-words whitespace-pre-wrap">
              {convertedCSS || "Converted CSS will appear here"}
            </pre>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => copyToClipboard(convertedCSS)}
              >
                <FaCopy size={16} />
              </button>
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => downloadFile(convertedCSS, "converted.css")}
              >
                <FaDownload size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TailwindToCSSConverter;
