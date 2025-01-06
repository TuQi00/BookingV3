import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles.css";
import "./Calendar.css";
import CategorySelect from "./CategorySelect";
import ServiceSelect from "./ServiceSelect";
import EmployeeSelect from "./EmployeeSelect";
import Calendar from "./Calendar";

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

  // Fetch category details when category changes
  useEffect(() => {
    const category = watch("category"); // Get value from useForm hook
    if (category) {
      setValue("service", ""); // Reset service
      setValue("employee", ""); // Reset employee
      setServiceDetails(null);
      setEmployeeDetails(null);
      fetchDetails("categories", category);
    } else {
      setCategoryDetails(null);
    }
  }, [watch("category"), setValue, fetchDetails]);

  // Fetch service details when category and service are selected
  useEffect(() => {
    const category = watch("category");
    const service = watch("service");
    if (category && service) {
      fetchDetails("services", service, category);
    } else {
      setServiceDetails(null);
    }
  }, [watch("category"), watch("service"), setValue, fetchDetails]);

  // Fetch employee details when employee changes
  useEffect(() => {
    const employee = watch("employee");
    if (employee) {
      fetchDetails("employees", employee);
    } else {
      setEmployeeDetails(null);
    }
  }, [watch("employee"), fetchDetails]);

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
        <form onSubmit={handleSubmit(handleNext)}>
          <CategorySelect
            value={watch("category")}
            onChange={(val) => setValue("category", val)}
          />
          <ServiceSelect
            value={watch("service")}
            onChange={(val) => setValue("service", val)}
            categoryId={watch("category")}
          />
          {serviceDetails && (
            <div className="service-details">
              <p>
                <strong>Service:</strong> {serviceDetails.name}
              </p>
              <p>
                <strong>Price:</strong> ${serviceDetails.price}
              </p>
              <p>
                <strong>Description:</strong> {serviceDetails.description}
              </p>
            </div>
          )}
          <EmployeeSelect
            value={watch("employee")}
            onChange={(val) => setValue("employee", val)}
            serviceId={watch("service")}
          />
          <div className="button-group">
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit(handleNext)}>
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
            <button type="submit">Continue</button>
          </div>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit(handleNext)}>
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
            <button type="submit">Next</button>
          </div>
        </form>
      )}
      {step === 4 && (
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
      )}
      {step === 5 && (
        <div>
          <h2>Booking Successful!</h2>
          <button onClick={resetForm}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
