import React from "react";

const Step3Form = ({ register, handlePrevious, handleNext }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Email:</label>
      <input
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      <div className="button-group">
        <button type="button" onClick={handlePrevious}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </form>
  );
};

export default Step3Form;
