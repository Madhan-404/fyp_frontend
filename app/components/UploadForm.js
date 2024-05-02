"use client";
import React, { useState } from 'react';
import Papa from "papaparse"
import axios from "axios";
const UploadForm = ({ onSubmit,updatePlotData }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [coordinates,setCoordinates] = useState(null)
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        Papa.parse(event.target.files[0],{
            header: true,
            skipEmptyLines: true,
            complete: function(results){
                const outputArray = results.data.map(obj => {
                    return {
                        x: parseInt(obj.X, 10),
                        y: parseInt(obj.Y, 10)
                    };
                });
                setCoordinates(
                      {
                        label: 'Coordinates',
                        data: outputArray,
                        borderColor: 'red',
                        showLine: false,
                      }
                    )
            }
        })
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a CSV file to upload.');
            return;
        }
        try {
            await onSubmit(file,coordinates);
            setError(null);
                  const formData = new FormData();
                  formData.append("file", file);
                  const algorithms = ["aco_predict","lkh_predict","local_search_predict","bnb_predict","hopfield_nn_predict"]
                  for(const algorithm of algorithms){
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${algorithm}`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
                    const {Permutation,Distance} = response.data
                    await updatePlotData(Permutation,algorithm,Distance,coordinates)
                  }
            
                } catch (error) {
                  console.error("Error processing data:", error);
                }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="csv-file" name="file" accept=".csv" onChange={handleChange} />
            <button type="submit">Upload CSV</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default UploadForm;
