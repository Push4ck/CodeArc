import React, { useState, useEffect } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaDownload } from "react-icons/fa";
import { MdPreview, MdCode } from "react-icons/md";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";
import { downloadProject } from "../utils/downloadProject";
import Split from "react-split";

const EditorPage = () => {
  const [html, setHtml] = useState(localStorage.getItem("html") || "");
  const [css, setCss] = useState(localStorage.getItem("css") || "");
  const [js, setJs] = useState(localStorage.getItem("js") || "");
  const [activeTab, setActiveTab] = useState("html");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => localStorage.setItem("html", html), [html]);
  useEffect(() => localStorage.setItem("css", css), [css]);
  useEffect(() => localStorage.setItem("js", js), [js]);

  const getCurrentCode = () => {
    switch (activeTab) {
      case "html":
        return { language: "html", value: html, setter: setHtml };
      case "css":
        return { language: "css", value: css, setter: setCss };
      case "js":
        return { language: "javascript", value: js, setter: setJs };
      default:
        return { language: "html", value: html, setter: setHtml };
    }
  };

  const { language, value, setter } = getCurrentCode();

  return (
    <>
      <div className="flex flex-col bg-gray-900 min-h-screen relative">
        <div className="md:hidden w-full h-full">
          <div className="w-full bg-gray-800 text-[var(--clr-light-a0)] flex justify-end px-4 py-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-[var(--clr-light-a0)] hover:bg-gray-600 transition rounded"
            >
              {showPreview ? <MdCode size={20} /> : <MdPreview size={20} />}
              {showPreview ? " Code Editor" : " Live Preview"}
            </button>
          </div>

          {showPreview ? (
            <div className="bg-[var(--clr-light-a0)] w-full h-[80vh] p-2 overflow-auto">
              <LivePreview html={html} css={css} js={js} />
            </div>
          ) : (
            <>
              <div className="flex bg-gray-800 text-[var(--clr-light-a0)]">
                {[
                  {
                    id: "html",
                    icon: <FaHtml5 size={20} />,
                    color: "border-red-500",
                  },
                  {
                    id: "css",
                    icon: <FaCss3Alt size={20} />,
                    color: "border-blue-500",
                  },
                  {
                    id: "js",
                    icon: <FaJs size={20} />,
                    color: "border-yellow-500",
                  },
                ].map(({ id, icon, color }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-3 text-center border-b-4 flex items-center justify-center gap-2 transition cursor-pointer ${
                      activeTab === id
                        ? `${color} border-solid`
                        : "border-transparent"
                    } hover:bg-gray-700`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="h-[75vh] overflow-auto">
                <CodeEditor
                  language={language}
                  value={value}
                  onChange={setter}
                />
              </div>
            </>
          )}
        </div>

        <div className="hidden md:flex flex-grow overflow-auto">
          <Split className="flex w-full h-full" sizes={[50, 50]} minSize={300}>
            <div className="flex flex-col w-full h-[90vh] overflow-auto">
              <div className="flex bg-gray-800 text-[var(--clr-light-a0)]">
                {[
                  {
                    id: "html",
                    icon: <FaHtml5 size={20} />,
                    color: "border-red-500",
                  },
                  {
                    id: "css",
                    icon: <FaCss3Alt size={20} />,
                    color: "border-blue-500",
                  },
                  {
                    id: "js",
                    icon: <FaJs size={20} />,
                    color: "border-yellow-500",
                  },
                ].map(({ id, icon, color }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-3 text-center border-b-4 flex items-center justify-center gap-2 transition cursor-pointer ${
                      activeTab === id
                        ? `${color} border-solid`
                        : "border-transparent"
                    } hover:bg-gray-700`}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <div className="flex-grow overflow-auto">
                <CodeEditor
                  language={language}
                  value={value}
                  onChange={setter}
                />
              </div>
            </div>

            <div className="bg-[var(--clr-light-a0)] w-full h-[90vh] overflow-auto">
              <LivePreview html={html} css={css} js={js} />
            </div>
          </Split>
        </div>

        <button
          onClick={() => downloadProject(html, css, js)}
          className="bg-[var(--clr-light-a0)] text-[var(--clr-dark-a0)] hover:bg-[var(--clr-primary-a0)] hover:text-[var(--clr-light-a0)] px-4 py-3 rounded-lg flex items-center gap-2 w-fit cursor-pointer my-4 self-end mr-4"
        >
          <FaDownload size={20} />
          Download
        </button>
      </div>
    </>
  );
};

export default EditorPage;
