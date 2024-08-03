import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import axios from "axios";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [compiling, setCompiling] = useState(false);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: language, json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue(); // code has value which we write
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  // data receive from server
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  const compileCode = async () => {
    setCompiling(true);
    try {
      const response = await axios.post(
        "https://online-code-compiler.p.rapidapi.com/v1/",
        {
          language: language,
          version: "latest",
          code: editorRef.current.getValue(),
          input: null,
        },
        {
          headers: {
            "x-rapidapi-key": "369c6e8405mshfe84aab959364b4p1409aajsnd9049fc079a5",
            "x-rapidapi-host": "online-code-compiler.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data.output);
    } catch (error) {
      console.error("Compilation error:", error);
      setOutput("Compilation error. Please try again.");
    } finally {
      setCompiling(false);
    }
  };

  return (
    <div>
      <div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="form-select mb-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python3">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <div style={{ height: "600px" }}>
        <textarea id="realtimeEditor"></textarea>
      </div>
      <div className="mt-2">
        <button
          onClick={compileCode}
          className="btn btn-primary"
          disabled={compiling}
        >
          {compiling ? "Compiling..." : "Compile"}
        </button>
      </div>
      <div className="mt-2">
        <h5>Output:</h5>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Editor;
