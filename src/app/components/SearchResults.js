import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PassengerDetailsModal from "./PassengerDetailsModal";

const SearchResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);
  const [selectedOfferPrice, setSelectedOfferPrice] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [adultPassengers, setAdultPassengers] = useState(0);

  console.log("searchResults results", results);

  const formatDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleSelectOffer = (offerId) => {
    const offer = results.find((o) => o.id === offerId);
    if (offer) {
      const passengerIds = offer.passenger_ids;
      const totalAmount = offer.slices[0].total_amount; // Assuming the price is here
      setSelectedPassengerIds(passengerIds);
      setSelectedOfferPrice(totalAmount); // Store the price in state
      setAdultPassengers(passengerIds.length); // Set the number of adult passengers
  
      // Log the number of adult passengers
      console.log("Number of adult passengers:", passengerIds.length);
    }
    setSelectedOfferId(offerId);
    setIsModalOpen(true);
  };

  const handlePassengerDetailsSubmit = async (orderPayload) => {
    try {
      const response = await fetch("http://localhost:5000/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to create order:", data);
        throw new Error(data.message || "Failed to create order"); // Throw an error if response is not ok
      }
      console.log("Order created successfully:", data);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error creating order:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-gray-50">
      <div className="font-semibold mb-2">Results</div>
      {showSuccessMessage && <div className="text-green-500 mb-2">Booked!</div>}
      {results.map((offer, index) => {
        const totalAmount = offer.slices[0].total_amount;
        const baseCurrency = offer.slices[0].base_currency;

        return (
          <div
            key={index}
            className="border w-full flex-row bg-white p-2 border-gray-800 flex rounded-lg mb-4"
          >
            <div className="w-3/4">
              {offer.slices.map((slice, sliceIndex) => (
                <React.Fragment key={sliceIndex}>
                  <div className="flex items-center justify-around gap-4">
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
                  <span className="text-xs text-slate-500 ">
                    {baseCurrency}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                aria-label="Select flight"
                onClick={() => handleSelectOffer(offer.id)} // Replace `offer.id` with the actual property path to the offer ID
              >
                Select <FontAwesomeIcon icon={faChevronCircleRight} />
              </button>
            </div>
          </div>
        );
      })}
      <PassengerDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePassengerDetailsSubmit}
        selectedOfferId={selectedOfferId}
        passengerIds={selectedPassengerIds}
        price={selectedOfferPrice}
        adultPassengers={adultPassengers}
      />
    </div>
  );
};

export default SearchResults;
