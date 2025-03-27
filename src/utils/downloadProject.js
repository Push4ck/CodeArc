import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadProject = (html, css, js) => {
  const zip = new JSZip();

  zip.file("index.html", html);
  zip.file("style.css", css);
  zip.file("script.js", js);

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "codearc-project.zip");
  });
};
