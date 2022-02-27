import React, { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

function App() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("Recognizing...");
  const [file, setFile] = useState(null);

  const doOCR = useCallback(async (file) => {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(file);
    setResult(text);
    setStatus("done");
  }, []);

  useEffect(() => {
    if (!file) {
      setStatus("");
      return;
    }
    setStatus("recognizing...");
    doOCR(file);
  }, [doOCR, file]);

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setFile(e.target[0].files[0]);
  };

  return (
    <div className="App">
      <form onSubmit={handleFileSubmit}>
        <input type="file" name="file" id="file" />
        <button type="submit">Submit</button>
      </form>
      <h3>Status: {status}</h3>
      <h3>Result:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;
