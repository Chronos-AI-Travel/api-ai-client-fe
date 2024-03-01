"use client";
import React, { useState } from "react";
import FlightSearch from "./components/FlightSearch";
import Logo from "./components/Logo";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    travelers: 1, // Default to 1 traveler
  });
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (from, to, departDate, returnDate, travelers) => {
    setSearchParams({ from, to, departDate, returnDate, travelers });
    const allFlights = [
      {
        operator: "Ryanair",
        outboundTime: "08:45",
        flightDuration: 2,
        arrivalTime: "10:45",
        stop: "Direct",
        price: "£45",
        departureAirport: "LHW",
        arrivalAirport: "CDG",
      },
      {
        operator: "Lufthansa",
        outboundTime: "09:45",
        flightDuration: 1.45,
        arrivalTime: "11:15",
        stop: "Direct",
        price: "£72",
        departureAirport: "LHW",
        arrivalAirport: "LHW",
      },
    ];

    const filteredResults = allFlights.filter(
      (flight) =>
        flight.departureAirport === from || flight.arrivalAirport === to
    );
    setSearchResults(filteredResults);
  };

  return (
    <main className="bg-blue-50 gap-4 flex flex-col min-h-screen items-start justify-start px-16 py-8">
      <Logo />
      <FlightSearch onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </main>
  );
}
