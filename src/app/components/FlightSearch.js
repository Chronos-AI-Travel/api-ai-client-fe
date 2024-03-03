"use client";
import React, { useState } from "react";

const FlightSearch = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [offers, setOffers] = useState([]); // State to store fetched offers

  const handleSearchClick = async () => {
    const postData = {
      data: {
        // Ensure this matches the backend's expected structure
        slices: [
          {
            origin: from, // Assuming 'from' is your origin IATA code
            destination: to, // Assuming 'to' is your destination IATA code
            departure_date: departDate, // Format: "YYYY-MM-DD"
          },
        ],
        passengers: [
          {
            type: "adult", // Adjust based on your requirements
          },
        ],
        // Include any other necessary fields as required by your specific request
      },
    };

    try {
      const response = await fetch("http://localhost:5000/get_flight_offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOffers(data); // Store the fetched offers in state
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch flight offers:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-white">
      <div className="flex flex-wrap mx-2 items-end">
        {/* From input */}
        <div className="px-2 w-1/5 mb-4">
          <label
            htmlFor="originField"
            className="block mb-1 text-xs font-medium text-gray-900"
          >
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
          <label
            htmlFor="destinationField"
            className="block mb-1 text-xs font-medium text-gray-900"
          >
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
          <label
            htmlFor="departField"
            className="block mb-1 text-xs font-medium text-gray-900"
          >
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
          <label
            htmlFor="returnField"
            className="block mb-1 text-xs font-medium text-gray-900"
          >
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
          <label
            htmlFor="travelersField"
            className="block mb-1 text-xs font-medium text-gray-900"
          >
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
      <div>
        {offers && offers.length > 0 ? (
          offers.map((offer, index) => (
            <div key={index} className="offer">
              <p>
                Price: {offer.total_amount} {offer.total_currency}
              </p>
              <p>Airline: {offer.airline}</p>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
};
export default FlightSearch;
