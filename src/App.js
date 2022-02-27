import React, { useCallback, useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";

function App() {
  const [ocr, setOcr] = useState("Recognizing...");
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
    } = await worker.recognize(
      "https://tesseract.projectnaptha.com/img/eng_bw.png"
    );
    setOcr(text);
  }, []);

  useEffect(() => {
    if (!file) return;
    console.log(file);
    setOcr("Recognizing...");
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
      <p>{ocr}</p>
    </div>
  );
}

export default App;
