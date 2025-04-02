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

      document.body.removeChild(iframe);
    }, 1000);
  }, [tailwindCode]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-6 min-h-screen bg-[var(--clr-dark-a0)] text-[var(--clr-light-a0)]">
        {/* Tailwind Input */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Tailwind CSS Code</h2>
          <textarea
            className="w-full h-full p-4 rounded-lg text-[var(--clr-light-a0)] bg-[var(--clr-surface-a0)] resize-none"
            placeholder="Enter TailwindCSS code here..."
            value={tailwindCode}
            onChange={(e) => setTailwindCode(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          {/* HTML Output */}
          <div className="relative space-y-2">
            <h2 className="text-lg font-semibold">HTML Output</h2>
            <pre className="whitespace-pre-wrap text-sm text-[var(--clr-surface-tonal-a50)] bg-[var(--clr-surface-a0)] p-4 rounded-lg min-h-54">
              {htmlOutput}
            </pre>
          </div>

          {/* CSS Output */}
          <div className="relative space-y-2">
            <h2 className="text-lg font-semibold">CSS Output</h2>
            <pre className="whitespace-pre-wrap text-sm text-[var(--clr-surface-tonal-a50)] bg-[var(--clr-surface-a0)] p-4 rounded-lg min-h-54">
              {cssOutput}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default TailwindToCSSConverter;
