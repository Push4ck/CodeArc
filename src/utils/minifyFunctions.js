import { minify } from "terser";
import htmlMinifier from "html-minifier-terser";
import csso from "csso";

// Minify HTML
export const minifyHTML = (html) => {
  return htmlMinifier.minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
  });
};

// Minify CSS (Using `csso` instead of `clean-css`)
export const minifyCSS = (css) => {
  return csso.minify(css).css;
};

// Minify JavaScript
export const minifyJS = async (js) => {
  try {
    const result = await minify(js);
    return result.code || "";
  } catch {
    return "";
  }
};
