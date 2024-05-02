"use client";
import React, { useState,useReducer, useEffect } from "react";
import UploadForm from "./components/UploadForm.js";
import AlgorithmSelector from "./components/AlgorithmSelector.js";
import DataProcessor from "./components/DataProcessor.js";

import Plot from "./components/Plot.js"

export default function Home() {
  // const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [coordinates, setCoordinates] = useState(null)
  // const [plotData,setPlotData] = useState<ChartData<"scatter", (number | Point | null)[], unknown>>()
  const [datasets,setDatasets] = useState([])
  const processData = (state:any, action:any) => {
    switch (action.type) {
      case 'TOGGLE_LINE':
        return {
          ['datasets']: state.datasets.map((item:any) => ({
            ...item,
            showLine: !item['showLine'],
          })),
        };
      default:
        return state;
    }
  };
  const handleUploadSuccess = (file: React.SetStateAction<null>,coordinates: React.SetStateAction<null>) => {
    setFileUploaded(true);
    setUploadedFile(file); // Store the uploaded file in state
    setDatasets([...datasets,coordinates])
    setCoordinates(coordinates)
  };
  const addResult = (permutations,algorithm,distance,coordinates)=>{
    const dataset = []
    for(const i of permutations){
      dataset.push(coordinates.data[i])
    }
    setDatasets(datasets => [...datasets,{
      label: `${algorithm}-${distance}`,
      data: dataset,
      borderColor: 'red',
      showLine: true,
    }])
  }
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center px-55 py-55 font-mono">
        <UploadForm onSubmit={handleUploadSuccess} updatePlotData={addResult} />
        {/* {fileUploaded && (
          <>
            <DataProcessor updatePlotData={addResult} file={uploadedFile}/>
          </>
        )
        } */}
        {
          datasets.map(dataset=><Plot data={dataset}/>)
        }
      </div>
    </main>
  );
}
