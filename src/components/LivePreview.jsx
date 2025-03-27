import React, { useEffect, useState } from "react";

const LivePreview = ({ html, css, js }) => {
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${css}</style></head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <iframe srcDoc={srcDoc} className="w-full h-full border-none"></iframe>
    </>
  );
};

export default LivePreview;
