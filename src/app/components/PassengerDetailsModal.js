import React, { useState, useEffect } from "react";

const PassengerDetailsModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedOfferId,
  passengerIds,
  price,
}) => {
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Dynamically set the initial state based on passengerIds length
    const initialPassengerDetails = passengerIds.map(() => ({
      given_name: "",
      family_name: "",
      born_on: "",
      email: "",
      phone: "",
      gender: "m",
      title: "mr",
    }));
    setPassengerDetails(initialPassengerDetails);
  }, [passengerIds]); // Depend on passengerIds

  if (!isOpen) return null;

  const handleChange = (index, e) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [e.target.name]: e.target.value,
    };
    setPassengerDetails(updatedPassengers);
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    passengerDetails.forEach((passenger, index) => {
      if (!passenger.given_name.trim()) {
        isValid = false;
        newErrors[`given_name_${index}`] = "Given name is required";
      }
    });

    setErrors(newErrors);
    return isValid; // Return true if all fields are valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return; // Stop the submission if there are validation errors
    }

    setIsSubmitting(true); // Indicate that submission is in progress

    // Adjusted to map over all passengerDetails and construct the passengers array
    const orderPayload = {
      data: {
        type: "instant",
        selected_offers: [selectedOfferId],
        passengers: passengerDetails.map((passenger, index) => ({
          phone_number: passenger.phone,
          email: passenger.email,
          born_on: passenger.born_on,
          title: passenger.title,
          gender: passenger.gender,
          family_name: passenger.family_name,
          given_name: passenger.given_name,
          id: passengerIds[index],
        })),
        payments: [
          {
            currency: "GBP",
            amount: price,
            type: "balance",
          },
        ],
      },
    };

    try {
      await onSubmit(orderPayload);
      onClose(); // Close the modal only if submission was successful
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionError("Failed to book. Please try again."); // Show error message
    } finally {
      setIsSubmitting(false); // Submission attempt is finished, allow new attempts
    }
  };

  return (
    <div
      className="w-11/12 bg-slate-800 text-white font-montserrat border-4 shadow-lg shadow-slate-800 rounded-lg border-slate-800"
      style={{
        position: "fixed",
        top: "3%",
        left: "3%",
        padding: "20px",
        zIndex: 100,
        maxHeight: "90vh", // Set a maximum height

        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <p className="text-2xl font-light pb-6 mb-4 border-b-2">
        Enter Passenger Details
      </p>
      {submissionError && <div className="text-red-500">{submissionError}</div>}

      <form onSubmit={handleSubmit}>
        {passengerDetails.map((passenger, index) => (
          <div
            key={index}
            className="mb-4 border-b border-slate-400 bg-slate-600 rounded-lg p-4 flex flex-col pb-3"
          >
            <p className="text-lg font-normal mb-2">Passenger {index + 1}</p>
            <select
              name="title"
              placeholder="Title"
              value={passenger.title} // Corrected to use passenger.title
              onChange={(e) => handleChange(index, e)} // Corrected to pass index
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            >
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
            </select>
            <input
              type="text"
              name="given_name"
              value={passenger.given_name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Given Name"
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
            <input
              type="text"
              placeholder="Family Name"
              name="family_name"
              value={passenger.family_name}
              onChange={(e) => handleChange(index, e)}
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
            <select
              name="gender"
              value={passenger.gender} // Corrected to use passenger.gender
              onChange={(e) => handleChange(index, e)} // Corrected to pass index
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            <label className="text-xs flex flex-col">
              Date of Birth:
              <input
                type="date"
                name="born_on"
                value={passenger.born_on}
                onChange={(e) => handleChange(index, e)}
                className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
              />
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={passenger.email}
              onChange={(e) => handleChange(index, e)}
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (must include country code i.e. +44)"
              value={passenger.phone}
              onChange={(e) => handleChange(index, e)}
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
          </div>
        ))}
        <div className="w-full flex justify-between items-center pt-4">
          <button
            className="bg-blue-400 rounded-lg p-2 text-white mb-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Pay & Book"}
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
