"use client";
import {
  faEllipsisH,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const HotelSearch = ({ onOffersUpdate, onSearchStart }) => {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!destination.trim()) errors.destination = "Destination is required.";
    if (!checkInDate.trim()) errors.checkInDate = "Check-in date is required.";
    if (!checkOutDate.trim()) errors.checkOutDate = "Check-out date is required.";
    // Add more validations as needed

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSearchClick = async () => {
    if (!validateFields()) return; // Ensure validation is performed

    onSearchStart(); // Notify parent component that search has started
    setIsLoading(true);

    // Adjusted request payload for the backend API
    const requestBody = {
      destination,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults,
      children,
      rooms,
    };

    console.log("Sending to backend:", requestBody);

    try {
      const response = await fetch("http://localhost:5000/get_hotel_availability", { // Adjust this endpoint as necessary
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
      console.log("Received from backend:", data);
      onOffersUpdate(data); // Update parent component with the search results
    } catch (error) {
      console.error("Failed to fetch:", error);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        submit: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-slate-800 mb-2 p-4 items-center justify-between rounded-lg flex flex-row text-white">
      <div className="flex flex-row text-white items-center">
        {/* Destination input */}
        <div className="px-2 mb-4">
          <label htmlFor="destinationField" className="block mb-1 text-xs font-medium">
            Destination
          </label>
          <input
            type="text"
            id="destinationField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            placeholder="Destination e.g., Majorca"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Check-in date input */}
        <div className="px-2 mb-4">
          <label htmlFor="checkInDateField" className="block mb-1 text-xs font-medium">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkInDateField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            required
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>

        {/* Check-out date input */}
        <div className="px-2 mb-4">
          <label htmlFor="checkOutDateField" className="block mb-1 text-xs font-medium">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOutDateField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            required
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        {/* Adults input */}
        <div className="px-2 mb-4">
          <label htmlFor="adultsField" className="block mb-1 text-xs font-medium">
            Adults
          </label>
          <input
            type="number"
            id="adultsField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            min="1"
            required
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </div>

        {/* Children input */}
        <div className="px-2 mb-4">
          <label htmlFor="childrenField" className="block mb-1 text-xs font-medium">
            Children
          </label>
          <input
            type="number"
            id="childrenField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            min="0"
            required
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
        </div>

        {/* Rooms input */}
        <div className="px-2 mb-4">
          <label htmlFor="roomsField" className="block mb-1 text-xs font-medium">
            Rooms
          </label>
          <input
            type="number"
            id="roomsField"
            className="bg-gray-50 text-slate-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-10"
            min="1"
            required
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
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
