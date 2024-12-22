import React, { useState, useEffect } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_based_url } from "../helper";
import { useParams } from "react-router-dom";

const EditorApp = () => {
  const [islightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState(`<!doctype html>
                                            <html lang="en">
                                              <head>
                                                <meta charset="UTF-8" />
                                                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                                <title>Vite + React</title>
                                              </head>
                                              <body>
                                              </body>
                                            </html>`);
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("console.log('Hello world');");

  let { projectID } = useParams();

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

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  // get project from API
  useEffect(() => {
    fetch(api_based_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHtmlCode(data.project.htmlCode || "");
          setCssCode(data.project.cssCode || "");
          setJsCode(data.project.jsCode || "");
        } else {
          console.error("Failed to fetch project:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, [projectID]);

  // handling ctr + s
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save file dialog

        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_based_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

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
