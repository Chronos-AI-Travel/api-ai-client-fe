"use client";
import {
  faEllipsisH,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const HotelSearch = ({ onOffersUpdate, onSearchStart }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adultPassengers, setAdultPassengers] = useState(1);
  const [childPassengers, setChildPassengers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!from.trim()) errors.from = "From location is required.";
    if (!to.trim()) errors.to = "To location is required.";
    if (!departDate.trim()) errors.departDate = "Departure date is required.";
    // Add more validations as needed

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSearchClick = async () => {
    // if (!validateFields()) return; // Stop submission if validation fails

    // onSearchStart(); // Notify parent component that search has started
    // setIsLoading(true);

    // Prepare the request payload
    const requestBody = {
      checkin: departDate,
      checkout: returnDate,
      adults: adultPassengers,
      rooms: 1, // Assuming 1 room for simplicity, adjust as needed
    };

    // Log the request payload to the console
    console.log("Sending to backend:", requestBody);

    try {
      const response = await fetch("http://localhost:5000/search_hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      onOffersUpdate(data); // Update parent component with the search results
    } catch (error) {
      console.error("Failed to fetch:", error);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        submit: error.message,
      }));
      // } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl  bg-slate-800 mb-2 p-4 items-center justify-between rounded-lg flex flex-row text-white">
      <div className="flex flex-row text-white items-center">
        {/* From input */}
        <div className="px-2  mb-4">
          <label
            htmlFor="originField"
            className="block mb-1 text-xs font-medium"
          >
            Where are you going?
          </label>
          <input
            type="text"
            id="originField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            placeholder="London (Any)"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          {validationErrors.submit && (
            <div className="text-red-500 mt-2 text-xs">
              {validationErrors.submit}
            </div>
          )}
        </div>

        <div className="px-2 mb-4">
          <label
            htmlFor="departField"
            className="block mb-1 text-xs font-medium "
          >
            Check-in date
          </label>
          <input
            type="date"
            id="departField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            required
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>

        <div className="px-2  mb-4">
          <label
            htmlFor="returnField"
            className="block mb-1 text-xs font-medium"
          >
            Check-out date
          </label>
          <input
            type="date"
            id="returnField"
            className="bg-gray-50 border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            required
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="text-sm flex items-center gap-3 mb-2 ml-4">
          <label className="flex flex-col" htmlFor="adultPassengers">
            Adults
            <span className="font-light text-xs text-slate-400">
              (Aged 16+)
            </span>
          </label>
          <input
            type="number"
            id="adultPassengers"
            className="w-14 border text-slate-600 rounded-lg p-2 mr-4"
            value={adultPassengers}
            onChange={(e) => setAdultPassengers(Number(e.target.value))}
            min="1" // Ensure there's at least one adult
          />
        </div>
        <div className="text-sm flex items-center gap-2 mb-2">
          <label className="flex flex-col" htmlFor="adultPassengers">
            Children
            <span className="font-light text-xs text-slate-400">
              (Aged 0-15+)
            </span>
          </label>
          <input
            type="number"
            id="adultPassengers"
            className="w-14 border text-slate-600 rounded-lg p-2 mr-4"
            value={adultPassengers}
            onChange={(e) => setAdultPassengers(Number(e.target.value))}
            min="1" // Ensure there's at least one adult
          />
        </div>
        <div className="text-sm flex items-center gap-2 mb-2">
          <label className="flex flex-col" htmlFor="adultPassengers">
            Rooms
          </label>
          <input
            type="number"
            id="adultPassengers"
            className="w-14 border text-slate-600 rounded-lg p-2 mr-4"
            value={adultPassengers}
            onChange={(e) => setAdultPassengers(Number(e.target.value))}
            min="1" // Ensure there's at least one adult
          />
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
export default HotelSearch;
