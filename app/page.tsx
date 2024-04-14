"use client";
import React, { useState } from "react";
import UploadForm from "./components/UploadForm.js";
import AlgorithmSelector from "./components/AlgorithmSelector.js";
import DataProcessor from "./components/DataProcessor.js";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadSuccess = (file: React.SetStateAction<null>) => {
    setFileUploaded(true);
    setUploadedFile(file); // Store the uploaded file in state
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center px-55 py-55 font-mono">
        <UploadForm onSubmit={handleUploadSuccess} />
        {fileUploaded && (
          <>
            <AlgorithmSelector onSelectAlgorithm={setSelectedAlgorithm} />
            <DataProcessor algorithm={selectedAlgorithm} file={uploadedFile} />
          </>
        )}
        {selectedAlgorithm && (
          <p className="mt-4">Selected Algorithm: {selectedAlgorithm}</p>
        )}
      </div>
    </main>
  );
}
