import React, { useState } from "react";

const PassengerDetailsModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedOfferId,
  passengerIds,
  price,
}) => {
  const [errors, setErrors] = useState({});

  const [passengerDetails, setPassengerDetails] = useState({
    given_name: "",
    family_name: "",
    born_on: "",
    email: "",
    phone: "",
    gender: "m",
    title: "mr",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    // Example validation: check if the given_name field is empty
    if (!passengerDetails.given_name.trim()) {
      newErrors.given_name = "Error with this field";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return; // Stop the submission if there are validation errors
    }
    const orderPayload = {
      data: {
        type: "instant",
        selected_offers: [selectedOfferId],
        passengers: [
          {
            phone_number: passengerDetails.phone,
            email: passengerDetails.email,
            born_on: passengerDetails.born_on,
            title: passengerDetails.title,
            gender: passengerDetails.gender,
            family_name: passengerDetails.family_name,
            given_name: passengerDetails.given_name,
            id: passengerIds[0],
          },
        ],
        payments: [
          {
            currency: "GBP",
            amount: price,
            type: "balance",
          },
        ],
      },
    };
    console.log("Submitting order with payload:", orderPayload); // Log the payload
    onSubmit(orderPayload);
    onClose(); 
  };

  return (
    <div
      className="w-2/3 h-fit font-montserrat border-2 rounded-lg border-slate-800"
      style={{
        position: "fixed",
        top: "20%",
        left: "30%",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <p className="text-2xl font-light mb-6">Enter Passenger Details</p>
      <form
        className="flex flex-wrap w-full gap-4 text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 min-w-1/2">
          <label className="text-xs flex flex-col">
            Given Name
            <input
              type="text"
              name="given_name"
              value={passengerDetails.given_name}
              onChange={handleChange}
              className="border mb-4 rounded-lg p-2 text-sm w-full"
            />
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
          <label className="text-xs flex flex-col">
            Title
            <select
              name="title"
              value={passengerDetails.title}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm w-full"
            >
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
            </select>
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
          <label className="text-xs flex flex-col">
            Family Name:
            <input
              type="text"
              name="family_name"
              value={passengerDetails.family_name}
              onChange={handleChange}
              className="border  rounded-lg p-2 text-sm w-full"
            />
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
        </div>
        <div className="flex-1 min-w-1/2">
          <label className="text-xs flex flex-col">
            Gender:
            <select
              name="gender"
              value={passengerDetails.gender}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm w-full"
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
          <label className="text-xs flex flex-col">
            Date of Birth:
            <input
              type="date"
              name="born_on"
              value={passengerDetails.born_on}
              onChange={handleChange}
              className="border  rounded-lg p-2 text-sm w-full"
            />
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
          <label className="text-xs flex flex-col">
            Email:
            <input
              type="email"
              name="email"
              value={passengerDetails.email}
              onChange={handleChange}
              className="border  rounded-lg p-2 text-sm w-full"
            />
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
          <label className="text-xs flex flex-col">
            Phone (must include country code i.e. +44):
            <input
              type="text"
              name="phone"
              value={passengerDetails.phone}
              onChange={handleChange}
              className="border  rounded-lg p-2 text-sm w-full"
            />
            {errors.given_name && (
              <p className="text-red-500 text-xs">{errors.given_name}</p>
            )}
          </label>
        </div>
        <div className="w-full flex justify-between items-center pt-4">
          <button
            className="bg-blue-400 rounded-lg p-2 text-white mb-2"
            type="submit"
          >
            Pay & Book
          </button>
          <span className="text-sm font-bold">£{price}</span>
          <button
            className="border-blue-400 border rounded-lg p-2 text-blue-400 mb-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetailsModal;
