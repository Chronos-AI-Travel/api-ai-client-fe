"use client";
import {
  faEllipsisH,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CarSearch = ({ onOffersUpdate, onSearchStart }) => {
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
    if (!validateFields()) return; // Stop submission if validation fails

    onSearchStart();
    setIsLoading(true);

    const passengers = [
      ...Array(adultPassengers).fill({ type: "adult" }),
      ...Array(childPassengers).fill({ type: "child" }),
    ];

    const postData = {
      data: {
        slices: [
          {
            origin: from,
            destination: to,
            departure_date: departDate,
          },
        ],
        passengers: passengers,
      },
    };

    if (returnDate) {
      postData.data.slices.push({
        origin: to,
        destination: from,
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
        const errorData = await response.json(); // errorData contains an "errors" key with an array of strings
        // Check if errorData.errors is an array and has at least one message
        if (
          errorData.errors &&
          Array.isArray(errorData.errors) &&
          errorData.errors.length > 0
        ) {
          // Since we want to show all error messages, we can directly use errorData.errors array
          // However, since we're throwing an Error, we need to convert it to a string
          // We choose to throw the first error message for simplicity
          throw new Error(errorData.errors[0]);
        } else {
          // If the structure is not as expected, throw a generic error message
          throw new Error("Network response was not ok");
        }
      }

      const data = await response.json();
      onOffersUpdate(data);
    } catch (error) {
      console.error("Failed to fetch flight offers:", error);
      // Directly use the error message, which should now be correctly extracted
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        submit: error.message, // Assuming error.message is a string
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl  bg-slate-800  p-4 items-center justify-between rounded-lg flex flex-row text-white">
      <div className="flex flex-row text-white items-end">
        {/* From input */}
        <div className="px-2  mb-4">
          <label
            htmlFor="originField"
            className="block mb-1 text-xs font-medium"
          >
            Pick-up location
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

        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="departField"
            className="block mb-1 text-xs font-medium "
          >
            Pick-up date
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
            htmlFor="timeField" // Changed to match the input id
            className="block mb-1 text-xs font-medium"
          >
            Time
          </label>
          <input
            type="time" // Changed from date to time
            id="timeField" // Updated to be unique
            className="bg-gray-50 border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2 h-10"
            required
          />
        </div>
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="returnField"
            className="block mb-1 text-xs font-medium"
          >
            Drop-off date
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
        <div className="px-2 w-full md:w-1/5 mb-4">
          <label
            htmlFor="timeField" // Changed to match the input id
            className="block mb-1 text-xs font-medium"
          >
            Time
          </label>
          <input
            type="time" // Changed from date to time
            id="timeField" // Updated to be unique
            className="bg-gray-50 border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2 h-10"
            required
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
export default CarSearch;
