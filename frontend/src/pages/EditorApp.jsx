import React, { useState, useEffect } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";

const EditorApp = () => {
  const [islightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World!</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("console.log('Hello world');");

  const changeTheme = () => {
    if (islightMode) {
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;

    const iframe = document.getElementById("iframe");
    iframe.srcdoc = html + css + js;
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar />

      <div className="flex w-full">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  setTab("html");
                }}
                className="cursor-pointer tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md"
              >
                index.html
              </div>
              <div
                onClick={() => {
                  setTab("css");
                }}
                className="cursor-pointer tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md"
              >
                style.css
              </div>
              <div
                onClick={() => {
                  setTab("js");
                }}
                className="cursor-pointer tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md"
              >
                script.js
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i
                className="features text-[20px] cursor-pointer"
                onClick={changeTheme}
              >
                <MdLightMode />
              </i>
              <i
                className="features text-[20px] cursor-pointer"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>
          {/*  Tab Functanality  */}

          {tab == "html" ? (
            <>
              <Editor
                onChange={(e) => {
                  setHtmlCode(e || "");
                  run();
                }}
                height="83vh"
                theme={islightMode ? "vs-light" : "vs-dark"}
                language="html"
                value={htmlCode}
              />
            </>
          ) : tab == "css" ? (
            <>
              <Editor
                onChange={(e) => {
                  setCssCode(e || "");
                  run();
                }}
                height="83vh"
                theme={islightMode ? "vs-light" : "vs-dark"}
                language="css"
                value={cssCode}
              />
            </>
          ) : (
            <>
              <Editor
                onChange={(e) => {
                  setJsCode(e || "");
                  run();
                }}
                height="83vh"
                theme={islightMode ? "vs-light" : "vs-dark"}
                language="js"
                value={jsCode}
              />
            </>
          )}
        </div>
        <iframe
          id="iframe"
          className={`min-h-[89vh] bg-[#fff] text-black ${
            isExpanded ? "hidden" : "w-1/2"
          }`}
        ></iframe>
      </div>
    </>
  );
};

export default EditorApp;
