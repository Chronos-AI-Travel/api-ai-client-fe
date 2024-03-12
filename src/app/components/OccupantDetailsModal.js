import React, { useState } from "react";

const OccupantDetailsModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedHotelId,
  rooms,
  price,
}) => {
  const [guestDetails, setGuestDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useState(() => {
    const initialGuestDetails = Array(rooms)
      .fill()
      .map(() => ({
        name: "",
        email: "",
        specialRequests: "",
      }));
    setGuestDetails(initialGuestDetails);
  }, [rooms]);

  if (!isOpen) return null;

  const handleChange = (index, e) => {
    const updatedGuests = [...guestDetails];
    updatedGuests[index] = {
      ...updatedGuests[index],
      [e.target.name]: e.target.value,
    };
    setGuestDetails(updatedGuests);
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    guestDetails.forEach((guest, index) => {
      if (!guest.name.trim()) {
        isValid = false;
        newErrors[`name_${index}`] = "Name is required";
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

    const bookingPayload = {
      hotelId: selectedHotelId,
      guests: guestDetails,
      price: price,
    };

    try {
      await onSubmit(bookingPayload);
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
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <p className="text-2xl font-light pb-6 mb-4 border-b-2">
        Enter Guest Details
      </p>
      {submissionError && <div className="text-red-500">{submissionError}</div>}

      <form onSubmit={handleSubmit}>
        {guestDetails.map((guest, index) => (
          <div
            key={index}
            className="mb-4 border-b border-slate-400 bg-slate-600 rounded-lg p-4 flex flex-col pb-3"
          >
            <p className="text-lg font-normal mb-2">Guest {index + 1}</p>
            <input
              type="text"
              name="name"
              value={guest.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Full Name"
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={guest.email}
              onChange={(e) => handleChange(index, e)}
              className="border text-slate-800 rounded-lg p-2 text-sm w-full mb-2"
            />
            <textarea
              name="specialRequests"
              placeholder="Special Requests"
              value={guest.specialRequests}
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
            {isSubmitting ? "Booking..." : "Book Now"}
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

export default OccupantDetailsModal;
