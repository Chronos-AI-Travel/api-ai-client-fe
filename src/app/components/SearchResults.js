import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlane } from "@fortawesome/free-solid-svg-icons";

const SearchResults = ({ results }) => {
  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-gray-50">
      <div className="font-semibold mb-3">Results</div>
      {results.length > 0 ? (
        results.map((flight, index) => (
          <div
            key={index}
            className="border flex items-center justify-between bg-white p-2 border-gray-800 flex gap-4 rounded-lg mb-4"
          >
            <p className="mx-4 text-xs">{flight.operator}</p>
            <div className="flex items-center">
              <div className="flex justify-between flex-col">
                <p className="mx-4 text-3xl">{flight.outboundTime}</p>
                <p className="mx-4">{flight.departureAirport}</p>
              </div>
              <div className="w-24 flex flex-col justify-center items-center">
                <p className="mx-4 text-xs pb-1">{flight.flightDuration}h</p>
                <hr className="mx-4 border-gray-700" />
                <p className="mx-4 text-xs pt-1">{flight.stop}</p>
              </div>
              <div>
                <p className="mx-4 text-3xl">{flight.arrivalTime}</p>
                <p className="mx-4">{flight.arrivalAirport}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-2xl">{flight.price}</p>
              <button
                type="button"
                className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                aria-label={`Select ${flight.operator} flight`}
              >
                Select
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">No results found.</div>
      )}
    </div>
  );
};
export default SearchResults;