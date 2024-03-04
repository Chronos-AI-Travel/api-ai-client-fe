import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className="font-semibold mb-2">Results</div>
      {results.map((offer, index) => {
        // Assuming the first slice's total_amount represents the total for the entire offer
        const totalAmount = offer.slices[0].total_amount;
        const baseCurrency = offer.slices[0].base_currency;
        console.log(
          `Offer ${index + 1} Total Price: ${totalAmount} ${baseCurrency}`
        );

        return (
          <div
            key={index}
            className="border w-full flex-row bg-white p-2 border-gray-800 flex rounded-lg mb-4"
          >
            <div className="w-3/4">
              {offer.slices.map((slice, sliceIndex) => (
                <React.Fragment key={sliceIndex}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="mx-4 text-xs w-20">
                      {slice.operating_carrier_name}
                    </p>
                    <div className="flex items-center">
                      <div className="flex justify-between flex-col">
                        <p className="mx-4 text-3xl">
                          {new Date(slice.departing_at).toLocaleTimeString()}
                        </p>
                        <p className="mx-4">{slice.origin_iata_code}</p>
                      </div>
                      <div className="w-24 flex flex-col justify-center items-center">
                        <p className="mx-4 text-xs pb-1">
                          {formatDuration(
                            slice.departing_at,
                            slice.arriving_at
                          )}
                        </p>
                        <hr className="mx-4 border-gray-700" />
                        <p className="mx-4 text-slate-400 text-xs">
                          {slice.stops === 0
                            ? "Direct"
                            : `${slice.stops} Stops`}
                        </p>
                      </div>
                      <div>
                        <p className="mx-4 text-3xl">
                          {new Date(slice.arriving_at).toLocaleTimeString()}
                        </p>
                        <p className="mx-4">{slice.destination_iata_code}</p>
                      </div>
                    </div>
                  </div>
                  {sliceIndex < offer.slices.length - 1 && (
                    <hr className="my-4" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col w-1/4 justify-center ml-3 border-l-2 gap-4 text-lg items-center rounded-lg p-2">
              <div>
                <p className="font-light text-xs text-slate-800">TOTAL</p>
                <div className="flex gap-2 items-center">
                  <p className="">{totalAmount}</p>
                  <span className="text-xs text-slate-500 ">{baseCurrency}</span>
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                aria-label="Select flight"
              >
                Select <FontAwesomeIcon icon={faChevronCircleRight} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
