import React from "react";

const Step4Confirm = ({
  categoryDetails,
  serviceDetails,
  employeeDetails,
  watch,
  handlePrevious,
  handleSubmitBooking,
}) => {
  return (
    <div>
      <h2>Confirm Booking</h2>
      <p>
        <strong>Category:</strong> {categoryDetails?.name}
      </p>
      <p>
        <strong>Service:</strong> {serviceDetails?.name}
      </p>
      <p>
        <strong>Price:</strong> ${serviceDetails?.price}
      </p>
      <p>
        <strong>Description:</strong> {serviceDetails?.description}
      </p>
      <p>
        <strong>Employee:</strong> {employeeDetails?.name}
      </p>
      <p>
        <strong>Date:</strong> {watch("date")}
      </p>
      <p>
        <strong>Time:</strong> {watch("time")}
      </p>
      <div className="button-group">
        <button type="button" onClick={handlePrevious}>
          Back
        </button>
        <button type="button" onClick={handleSubmitBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Step4Confirm;
