"use client";
import React from "react";

const DataProcessor = ({ algorithm, file }) => {
  const processData = async () => {
    const formData = new FormData();
    formData.append("algorithm", algorithm);
    formData.append("file", file);

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process data");
      }

    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  React.useEffect(() => {
    if (algorithm && file) {
      processData();
    }
  }, [algorithm, file]);

  return null;
};

export default DataProcessor;
