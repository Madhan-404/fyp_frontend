"use client";
import axios from "axios";
import React from "react";

const DataProcessor = ({ updatePlotData, file }) => {
  const processData = async () => {
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      const algorithms = ["aco_predict","lkh_predict","local_search_predict","bnb_predict","hopfield_nn_predict"]
      for(const algorithm of algorithms){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${algorithm}`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
        const {Permutation,Distance} = response.data
        await updatePlotData(Permutation,algorithm,Distance)
      }

    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  React.useEffect(() => {
    if (file) {
      processData();
    }
  }, [file]);

  return null;
};

export default DataProcessor;
