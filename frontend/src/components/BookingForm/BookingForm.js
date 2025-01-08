import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/BookingForm.css";
import Step1Form from "./Steps/Step1/Step1Form";
import Step2Form from "./Steps/Step2/Step2Form";
import Step3Form from "./Steps/Step3/Step3Form";
import Step4Confirm from "./Steps/Step4/Step4Confirm";
import Step5Success from "./Steps/Step5/Step5Success";

const BookingForm = () => {
  const { register, handleSubmit, setValue, watch, errors, reset } = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const cache = useRef({ categories: {}, services: {}, employees: {} });

  const fetchDetails = useCallback(async (type, id, categoryId = null) => {
    if (cache.current[type][id]) {
      if (type === "categories") setCategoryDetails(cache.current[type][id]);
      if (type === "services") setServiceDetails(cache.current[type][id]);
      if (type === "employees") setEmployeeDetails(cache.current[type][id]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      if (!id) return;
      let url = `http://localhost:5000/api/${type}/${id}`;
      if (type === "services" && categoryId) {
        url = `http://localhost:5000/api/services/${categoryId}/services/${id}`;
      }

      const response = await axios.get(url);
      if (response.data && response.data.success) {
        cache.current[type][id] = response.data.data;
        if (type === "categories") setCategoryDetails(response.data.data);
        if (type === "services") setServiceDetails(response.data.data);
        if (type === "employees") setEmployeeDetails(response.data.data);
      } else {
        setError(`Failed to fetch ${type} details`);
      }
    } catch (err) {
      setError(err.response?.data?.msg || `Error fetching ${type} details`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNext = () => {
    if (step === 1 && (!watch("category") || !watch("service"))) {
      setError("Please select a category and a service.");
      return;
    }
    if (step === 2 && (!watch("date") || !watch("time"))) {
      setError("Please select a date and time.");
      return;
    }
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watch("email"))) {
      setError("Invalid email format.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmitBooking = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        data
      );
      if (response.data.success) {
        setStep(5);
      } else {
        setError(response.data.msg || "Unexpected error occurred.");
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || "Error submitting booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    reset(); // Resets the form values and errors
    setStep(1);
    setError("");
    setCategoryDetails(null);
    setServiceDetails(null);
    setEmployeeDetails(null);
  };

  return (
    <div className="booking-form-container">
      <header>
        <h2>Booking Application</h2>
      </header>
      <div className="step-indicator">
        <div className={`${step === 1 ? "active" : ""}`}>Service</div>
        <div className={`${step === 2 ? "active" : ""}`}>Time</div>
        <div className={`${step === 3 ? "active" : ""}`}>Information</div>
        <div className={`${step === 4 ? "active" : ""}`}>Confirm</div>
      </div>
      {error && <p className="error-message">{error}</p>}

      {step === 1 && (
        <Step1Form
          fetchDetails={fetchDetails}
          setValue={setValue}
          watch={watch}
          serviceDetails={serviceDetails}
          employeeDetails={employeeDetails}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <Step2Form
          register={register}
          watch={watch}
          setValue={setValue}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <Step3Form
          register={register}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
      {step === 4 && (
        <Step4Confirm
          categoryDetails={categoryDetails}
          serviceDetails={serviceDetails}
          employeeDetails={employeeDetails}
          watch={watch}
          handlePrevious={handlePrevious}
          handleSubmitBooking={handleSubmitBooking}
        />
      )}
      {step === 5 && <Step5Success resetForm={resetForm} />}
    </div>
  );
};

export default BookingForm;
