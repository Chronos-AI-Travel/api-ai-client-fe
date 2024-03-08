import React from "react";

const HotelSearchResults = ({ results }) => {
  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-gray-50">
      <div className="font-semibold mb-2">Results</div>
      {results.map((hotel, index) => (
        <div
          key={index}
          className="border w-full bg-white p-2 border-gray-800 flex rounded-lg mb-4 justify-between items-center"
        >
          <div className="text-lg">{hotel.name}</div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log(`Selected hotel ID: ${hotel.id}`)} // Placeholder for selection logic
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default HotelSearchResults;