"use client";
import React, { useState } from 'react';

const UploadForm = ({ onSubmit }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a CSV file to upload.');
            return;
        }
        try {
            await onSubmit(file);
            setError(null);
        } catch (error) {
            setError(`Error: ${error.message}`);
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
