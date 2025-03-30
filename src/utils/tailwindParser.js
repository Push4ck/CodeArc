export const parseTailwind = (tailwindCode) => {
  // Extract classes dynamically
  const classRegex = /class(?:Name)?="([^"]*)"/g;
  let uniqueClasses = new Set();

  let match;
  while ((match = classRegex.exec(tailwindCode)) !== null) {
    match[1].split(/\s+/).forEach((cls) => uniqueClasses.add(cls));
  }

  // Inject Tailwind classes into a `<style>` tag (JIT Compilation)
  const styleTag =
    document.getElementById("tailwind-dynamic-styles") || createStyleTag();
  styleTag.innerHTML = generateDynamicCSS([...uniqueClasses]);

  // Return cleaned HTML (without class attributes)
  const html = tailwindCode.replace(/\b(class|className)="[^"]*"/g, "").trim();

  return { html, css: styleTag.innerHTML };
};

// 🛠️ Helper function to create a `<style>` tag for Tailwind JIT
const createStyleTag = () => {
  const tag = document.createElement("style");
  tag.id = "tailwind-dynamic-styles";
  document.head.appendChild(tag);
  return tag;
};

// 🎨 Dynamically generate CSS using Tailwind JIT
const generateDynamicCSS = (classes) => {
  return `
      @import "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css";
      ${classes
        .map((cls) => `.${cls.replace(/:/g, "\\:")} { @apply ${cls}; }`)
        .join("\n")}
    `;
};
