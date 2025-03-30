import React, { useState, useEffect } from "react";

const TailwindToCSSConverter = () => {
  const [tailwindCode, setTailwindCode] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [cssOutput, setCssOutput] = useState("");

  useEffect(() => {
    if (!tailwindCode.trim()) {
      setHtmlOutput("");
      setCssOutput("");
      return;
    }

    // Create an iframe to process Tailwind styles
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument;

    doc.write(`
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="target">${tailwindCode}</div>
      </body>
      </html>
    `);
    doc.close();

    // Extract computed styles after Tailwind processes them
    setTimeout(() => {
      const targetElement = doc.getElementById("target");
      if (targetElement) {
        setHtmlOutput(targetElement.outerHTML);
        const computedStyles = window.getComputedStyle(targetElement);
        let extractedCSS = "";
        for (let prop of computedStyles) {
          extractedCSS += `${prop}: ${computedStyles.getPropertyValue(
            prop
          )};\n`;
        }
        setCssOutput(extractedCSS);
      }

      // Cleanup iframe to avoid memory leaks
      document.body.removeChild(iframe);
    }, 1000);
  }, [tailwindCode]);

  return (
    <div className="grid grid-cols-2 gap-4 p-6 h-screen bg-gray-900 text-white">
      {/* Tailwind Input */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Tailwind CSS Code</h2>
        <textarea
          className="w-full h-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700"
          placeholder="Enter TailwindCSS code here..."
          value={tailwindCode}
          onChange={(e) => setTailwindCode(e.target.value)}
        />
      </div>

      {/* Output */}
      <div className="flex flex-col gap-4">
        {/* HTML Output */}
        <div className="relative p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-lg font-semibold">HTML Output</h2>
          <pre className="whitespace-pre-wrap text-sm">{htmlOutput}</pre>
        </div>

        {/* CSS Output */}
        <div className="relative p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-lg font-semibold">CSS Output</h2>
          <pre className="whitespace-pre-wrap text-sm">{cssOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default TailwindToCSSConverter;
