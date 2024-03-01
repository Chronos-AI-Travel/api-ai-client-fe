"use client";
import React, { useState } from "react";

const FlightSearch = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1); // Default to 1 traveler

  const handleSearchClick = () => {
    onSearch(from, to, departDate, returnDate, travelers);
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-white">
      <div className="flex flex-wrap mx-2 items-end">
        {/* From input */}
        <div className="px-2 w-1/5 mb-4">
          <label htmlFor="originField" className="block mb-1 text-xs font-medium text-gray-900">
            From
          </label>
          <input
            type="text"
            id="originField"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="London (Any)"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        {/* To input */}
        <div className="px-2 w-1/5 mb-4">
          <label htmlFor="destinationField" className="block mb-1 text-xs font-medium text-gray-900">
            To
          </label>
          <input
            type="text"
            id="destinationField"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Country, city or airport"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        {/* Depart date input */}
        <div className="px-2 w-1/5 mb-4">
          <label htmlFor="departField" className="block mb-1 text-xs font-medium text-gray-900">
            Depart
          </label>
          <input
            type="date"
            id="departField"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>
        {/* Return date input */}
        <div className="px-2 w-1/5 mb-4">
          <label htmlFor="returnField" className="block mb-1 text-xs font-medium text-gray-900">
            Return
          </label>
          <input
            type="date"
            id="returnField"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        {/* Travelers select */}
        <div className="px-2 w-24 mb-4">
          <label htmlFor="travelersField" className="block mb-1 text-xs font-medium text-gray-900">
            Travelers
          </label>
          <select
            id="travelersField"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          >
            {[...Array(10).keys()].map((number) => (
              <option key={number} value={number + 1}>
                {number + 1}
              </option>
            ))}
          </select>
        </div>
        {/* Search button */}
        <div className="px-2 w-28 rounded-lg mb-4 flex items-end px-2">
          <button
            type="button" // Use type="button" to prevent form submission if wrapped in a form
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
            onClick={handleSearchClick} // Trigger search on click
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default FlightSearch;