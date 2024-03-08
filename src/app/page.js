"use client";
import React, { useState } from "react";
import FlightSearch from "./components/FlightSearch";
import FlightSearchResults from "./components/FlightSearchResults";
import Tabs from "./components/Tabs";
import Logo from "./components/Logo";
import CarSearch from "./components/CarSearch";
import RailSearch from "./components/RailSearch";
import HotelSearch from "./components/HotelSearch";
import HotelSearchResults from "./components/HotelSearchResults"; // Import the HotelSearchResults component

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeTab, setActiveTab] = useState("Flights"); // Default to 'Flights'

  const handleOffersUpdate = (newOffers) => {
    setOffers(newOffers);
  };

  return (
    <main className="bg-white flex flex-col min-h-screen pt-4 px-16">
      <div className="flex flex-row justify-between">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Logo />
      </div>
      {activeTab === "Flights" && (
        <>
          <FlightSearch
            onOffersUpdate={handleOffersUpdate}
            onSearchStart={() => setSearchPerformed(true)}
          />
          {searchPerformed && <FlightSearchResults results={offers} />}
        </>
      )}
      {activeTab === "Car Rental" && <CarSearch />}
      {activeTab === "Rail" && <RailSearch />}
      {activeTab === "Hotel" && (
        <>
          <HotelSearch
            onOffersUpdate={handleOffersUpdate}
            onSearchStart={() => setSearchPerformed(true)}
          />
          {searchPerformed && <HotelSearchResults results={offers} />}
        </>
      )}
    </main>
  );
}
