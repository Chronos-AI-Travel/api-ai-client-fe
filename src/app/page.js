"use client";
import React, { useState } from "react";
import FlightSearch from "./components/FlightSearch";
import Logo from "./components/Logo";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleOffersUpdate = (newOffers) => {
    setOffers(newOffers);
  };

  return (
    <main className="bg-white gap-2 flex flex-col min-h-screen items-start justify-start px-16 py-4">
      <Logo />
      <FlightSearch
        onOffersUpdate={handleOffersUpdate}
        onSearchStart={() => setSearchPerformed(true)}
      />
      {searchPerformed && <SearchResults results={offers} />}{" "}
    </main>
  );
}
