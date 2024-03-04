"use client";
import {
  faEllipsisH,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const FlightSearch = ({ onOffersUpdate, onSearchStart }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adultPassengers, setAdultPassengers] = useState(1);
  const [childPassengers, setChildPassengers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchClick = async () => {
    onSearchStart();
    setIsLoading(true);
    const passengers = [
      ...Array(adultPassengers).fill({ type: "adult" }),
      ...Array(childPassengers).fill({ type: "child" }),
    ];
  
    // Initialize postData with the outbound slice
    const postData = {
      data: {
        slices: [
          {
            origin: from,
            destination: to,
            departure_date: departDate,
          }
        ],
        passengers: passengers,
      },
    };
  
    // If a return date is specified, add the return slice
    if (returnDate) {
      postData.data.slices.push({
        origin: to, // For the return trip, the origin is the initial destination
        destination: from, // And the destination is the initial origin
        departure_date: returnDate,
      });
    }
  
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
      console.log("Received data:", data); // Log the received data
  
      onOffersUpdate(data);
    } catch (error) {
      console.error("Failed to fetch flight offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl border-2 bg-slate-800 border-black p-4 items-center justify-between rounded-lg flex flex-row text-white">
      <div className="flex flex-grow text-white items-start">
        {/* From input */}
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="originField"
            className="block mb-1 text-xs font-medium"
          >
            From
          </label>
          <input
            type="text"
            id="originField"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="London (Any)"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        {/* To input */}
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="destinationField"
            className="block mb-1 text-xs font-medium0"
          >
            To
          </label>
          <input
            type="text"
            id="destinationField"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Country, city or airport"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        {/* Depart date input */}
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="departField"
            className="block mb-1 text-xs font-medium "
          >
            Depart
          </label>
          <input
            type="date"
            id="departField"
            className="bg-gray-50 text-slate-400 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>
        {/* Return date input */}
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="returnField"
            className="block mb-1 text-xs font-medium"
          >
            Return
          </label>
          <input
            type="date"
            id="returnField"
            className="bg-gray-50 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        {/* Travelers select */}
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            className="flex flex-col w-24 text-xs font-medium"
            htmlFor="adultPassengers"
          >
            Passengers
          </label>
          <div htmlFor="passengerSelect" className="border-2 rounded-lg p-2 ">
            <div className="text-sm flex items-center gap-2 mb-2">
              <label className="flex flex-col w-24" htmlFor="adultPassengers">
                Adults{" "}
                <span className="font-light text-xs text-slate-400">
                  (Aged 16+)
                </span>
              </label>
              <input
                type="number"
                id="adultPassengers"
                className="w-14 border text-slate-400 rounded-lg p-2"
                value={adultPassengers}
                onChange={(e) => setAdultPassengers(Number(e.target.value))}
                min="1" // Ensure there's at least one adult
              />
            </div>
            <div className="text-sm flex items-center gap-2">
              <label className="flex flex-col w-24" htmlFor="childPassengers">
                Children{" "}
                <span className="font-light text-xs text-slate-400">
                  (Aged 0 to 15)
                </span>
              </label>
              <input
                type="number"
                id="childPassengers"
                className="w-14 border text-slate-400 rounded-lg p-2"
                value={childPassengers}
                onChange={(e) => setChildPassengers(Number(e.target.value))}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 w-full md:w-auto">
        <button
          type="button"
          className="bg-blue-500 border-2 border-white hover:bg-blue-700 text-white font-bold h-10 w-10 rounded flex items-center justify-center"
          onClick={handleSearchClick}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faEllipsisH} />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </button>
      </div>
    </div>
  );
};
export default FlightSearch;
