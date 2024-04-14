import React, { useState } from "react";

const AlgorithmSelector = ({ onSelectAlgorithm }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAlgorithmSelect = (event) => {
    const selectedAlgorithm = event.target.value;
    onSelectAlgorithm(selectedAlgorithm);
    setIsVisible(false); // Hide the dropdown after selecting an algorithm
  };

  return (
    <div className={"mt-4" + (isVisible ? "" : " hidden")}>
      <label htmlFor="algorithmSelect" className="block text-gray-700">Select an algorithm:</label>
      <select
        id="algorithmSelect"
        onChange={handleAlgorithmSelect}
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option className="bg-black text-white" value="">Select Algorithm</option>
        <option className="bg-black text-white" value="base_predict">Base Predict</option>
        <option className="bg-black text-white" value="aco_predict">ACO Predict</option>
        <option className="bg-black text-white" value="lkh_predict">LKH Predict</option>
        <option className="bg-black text-white" value="local_search_predict">Local Search Predict</option>
        <option className="bg-black text-white" value="hopfield_nn_predict">Hopfield NN Predict</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
