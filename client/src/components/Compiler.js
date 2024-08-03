import React, { useState } from "react";
import axios from "axios";

function Compiler() {
  const [language, setLanguage] = useState("python3");
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  
  const compileCode = async () => {
    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
        'x-rapidapi-key': '369c6e8405mshfe84aab959364b4p1409aajsnd9049fc079a5'
      },
      data: {
        language: language,
        version: 'latest',
        code: code,
        input: null
      }
    };

    try {
      const response = await axios.request(options);
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
      setOutput("Error compiling code.");
    }
  };

  return (
    <div className="container">
      <h1>Online Code Compiler</h1>
      <div className="form-group">
        <label htmlFor="languageSelect">Select Language</label>
        <select
          id="languageSelect"
          className="form-control"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python3">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="codeInput">Code</label>
        <textarea
          id="codeInput"
          className="form-control"
          rows="10"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={compileCode}>Compile</button>
      <div className="form-group">
        <label htmlFor="output">Output</label>
        <textarea
          id="output"
          className="form-control"
          rows="10"
          value={output}
          readOnly
        />
      </div>
    </div>
  );
}

export default Compiler;
