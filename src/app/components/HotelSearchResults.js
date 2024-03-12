import React, { useState } from "react";
import OccupantDetailsModal from "./OccupantDetailsModal";

const HotelSearchResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedHotelPrice, setSelectedHotelPrice] = useState("");
  const [rooms, setRooms] = useState(1);

  const getStars = (categoryName) => {
    switch (categoryName) {
      case "2 STARS":
        return "⭐⭐";
      case "3 STARS":
        return "⭐⭐⭐";
      case "4 STARS":
        return "⭐⭐⭐⭐";
      case "5 STARS":
        return "⭐⭐⭐⭐⭐";
      default:
        return "";
    }
  };

  const handleSelectHotel = (hotel) => {
    console.log("Selected hotel code (ID):", hotel.code); // This should log a defined value
    setSelectedHotelId(hotel.code); // Use 'code' as the identifier
    setSelectedHotelPrice(hotel.price);
    setRooms(hotel.roomsCount); // Assuming you want to book all available rooms
    setIsModalOpen(true);
  };

  const handleGuestDetailsSubmit = async (bookingPayload) => {
    // Implement the booking submission logic here
    // This might involve sending the bookingPayload to your backend API
    console.log("Submitting booking for hotel ID:", bookingPayload.hotelId);
    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-left border-2 border-black p-4 rounded-lg bg-gray-50">
      <div className="font-semibold mb-2">Results</div>
      {results.map((hotel, index) => (
        <div
          key={index}
          className="border w-full bg-white p-2 border-gray-800 flex flex-col md:flex-row rounded-lg mb-4 justify-between items-center"
        >
          <div className="flex-1">
            <div className="text-lg font-bold">{hotel.name}</div>
            <div className="text-lg">{hotel.destinationName}</div>
            <div className="text-sm">{getStars(hotel.categoryName)}</div>
            <div className="text-sm font-bold">{hotel.zoneName}</div>
            <div className="text-sm">Rooms: {hotel.roomsCount}</div>
            <div className="text-xs">
              Prices from:{" "}
              <span className="text-sm text-gray-400 font-bold">
                {hotel.currency}
              </span>{" "}
              <span className="text-lg">{hotel.price}</span>
            </div>
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0"
            onClick={() => handleSelectHotel(hotel)}
          >
            Select
          </button>
        </div>
      ))}
      <OccupantDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleGuestDetailsSubmit}
        selectedHotelId={selectedHotelId}
        rooms={rooms}
        price={selectedHotelPrice}
      />
    </div>
  );
};

export default HotelSearchResults;
