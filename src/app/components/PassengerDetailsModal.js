import React, { useState } from "react";

const PassengerDetailsModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedOfferId,
  passengerIds,
}) => {
  const [passengerDetails, setPassengerDetails] = useState({
    given_name: "",
    family_name: "",
    born_on: "",
    email: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderPayload = {
      data: {
        type: "instant",
        selected_offers: [selectedOfferId], // Ensure this is the ID of the selected offer
        passengers: [
          {
            phone_number: String(passengerDetails.phone_number), // Ensures phone_number is a string
            email: passengerDetails.email,
            born_on: passengerDetails.born_on,
            title: "mr",
            gender: "m",
            family_name: passengerDetails.family_name,
            given_name: passengerDetails.given_name,
            id: passengerIds[0],
          },
        ],
        payments: [
          {
            currency: "GBP",
            amount: "401.22",
            type: "balance", // Use 'balance' for Managed Content, or 'arc_bsp_cash' if applicable
          },
        ],
      },
    };
    console.log("Submitting order with payload:", orderPayload); // Log the payload
    onSubmit(orderPayload);
  };

  return (
    <div
      className="w-1/3 h-fit font-montserrat border-2 rounded-lg border-slate-800"
      style={{
        position: "fixed",
        top: "0%",
        left: "30%",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <p className="text-2xl font-light mb-6">Enter Passenger Details</p>
      <form
        className="flex flex-col gap-0 w-full text-sm"
        onSubmit={handleSubmit}
      >
        <label className="text-xs flex flex-col">
          Given Name
          <input
            type="text"
            name="given_name"
            value={passengerDetails.given_name}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <label className="text-xs flex flex-col">
          Title
          <input
            type="text"
            name="given_name"
            value={passengerDetails.given_name}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <br />
        <label className="text-xs flex flex-col">
          Family Name:
          <input
            type="text"
            name="family_name"
            value={passengerDetails.family_name}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <br />
        <label className="text-xs flex flex-col">
          Date of Birth:
          <input
            type="date"
            name="born_on"
            value={passengerDetails.born_on}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <br />
        <label className="text-xs flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            value={passengerDetails.email}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <br />
        <label className="text-xs flex flex-col">
          Phone:
          <input
            type="text"
            name="phone"
            value={passengerDetails.phone}
            onChange={handleChange}
            className="border  rounded-lg p-2 text-sm w-full"
          />
        </label>
        <br />
        <button
          className="bg-blue-400 rounded-lg p-2 text-white mb-2"
          type="submit"
        >
          Submit
        </button>
        <button
          className="border-blue-400 border rounded-lg p-2 text-blue-400 mb-2"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PassengerDetailsModal;
