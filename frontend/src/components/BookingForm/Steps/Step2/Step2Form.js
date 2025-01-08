import React from "react";
import Calendar from "../../../Calendar/Calendar";

const Step2Form = ({
  register,
  watch,
  setValue,
  handlePrevious,
  handleNext,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Choose Date:</label>
      <Calendar
        selectedDate={watch("date")}
        setSelectedDate={(date) => setValue("date", date)}
      />
      <label>Time:</label>
      <input type="time" {...register("time", { required: true })} />
      <div className="button-group">
        <button type="button" onClick={handlePrevious}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Continue
        </button>
      </div>
    </form>
  );
};

export default Step2Form;
