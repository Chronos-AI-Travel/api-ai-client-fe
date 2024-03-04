import React from "react";

const SearchResults = ({ results }) => {
  console.log("searchResults results", results);

  const formatDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-gray-50">
      <div className="font-semibold mb-3">Results</div>
      {results.map((offer, index) => (
        <div
          key={index}
          className="border flex items-center justify-between bg-white p-2 border-gray-800 flex gap-4 rounded-lg mb-2"
        >
          <p className="mx-4 text-xs w-20">{offer.operating_carrier_name}</p>
          <div className="flex items-center">
            <div className="flex justify-between flex-col">
              <p className="mx-4 text-3xl">
                {new Date(offer.departing_at).toLocaleTimeString()}
              </p>
              <p className="mx-4">{offer.origin_iata_code}</p>
            </div>
            <div className="w-24 flex flex-col justify-center items-center">
              <p className="mx-4 text-xs pb-1">
                {formatDuration(offer.departing_at, offer.arriving_at)}
              </p>{" "}
              <hr className="mx-4 border-gray-700" />
              <p className="mx-4 text-slate-400 text-xs">
                {offer.stops === 0 ? "Direct" : `${offer.stops} Stops`}
              </p>
            </div>
            <div>
              <p className="mx-4 text-3xl">
                {new Date(offer.arriving_at).toLocaleTimeString()}
              </p>
              <p className="mx-4">{offer.destination_iata_code}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <p className="font-light text-xs text-slate-400">TOTAL</p>
              <p className="text-xs gap-2 items-center border p-2 rounded-lg flex">
                <p className="text-xl">{offer.total_amount}</p>
                {offer.base_currency}
              </p>
            </div>
            <button
              type="button"
              className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              aria-label="Select flight"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
