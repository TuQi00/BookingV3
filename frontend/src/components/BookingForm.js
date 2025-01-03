import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import CategorySelect from "./CategorySelect";
import ServiceSelect from "./ServiceSelect";
import EmployeeSelect from "./EmployeeSelect";

const BookingForm = () => {
  const [step, setStep] = useState(1); // Current step
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);

  // Fetch category, service, employee details
  const fetchDetails = async (type, id, categoryId) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/${type}/${id}`;

      if (type === "services" && categoryId) {
        url = `http://localhost:5000/api/services/${categoryId}/services/${id}`;
      }

      const response = await axios.get(url);

      if (response.data.success) {
        if (type === "categories") setCategoryDetails(response.data.data);
        if (type === "services") setServiceDetails(response.data.data);
        if (type === "employees") setEmployeeDetails(response.data.data);
      } else {
        throw new Error("Failed to fetch details");
      }
    } catch (err) {
      console.error(`Error fetching ${type} details:`, err);
      setError(err.response?.data?.msg || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) fetchDetails("categories", category);
  }, [category]);

  useEffect(() => {
    if (category && service) fetchDetails("services", service, category);
  }, [category, service]);

  useEffect(() => {
    if (employee) fetchDetails("employees", employee);
  }, [employee]);

  const handleNext = () => {
    if (step === 1 && (!category || !service)) {
      setError("Please select a category and a service.");
      return;
    }
    if (step === 2 && (!date || !time)) {
      setError("Please select a date and time.");
      return;
    }
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const bookingData = { email, category, service, employee, date, time };
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      if (response.data.success) {
        setStep(5); // Booking Successful
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
    setEmail("");
    setCategory("");
    setService("");
    setEmployee("");
    setDate("");
    setTime("");
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

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <form>
          <CategorySelect value={category} onChange={setCategory} />
          <ServiceSelect
            value={service}
            onChange={setService}
            categoryId={category}
          />

          {/* Thêm thông tin chi tiết dịch vụ */}
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
            value={employee}
            onChange={setEmployee}
            serviceId={service}
          />
          <div className="button-group">
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Time Selection */}
      {step === 2 && (
        <form>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
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
      )}

      {/* Step 3: Information */}
      {step === 3 && (
        <form>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
      )}

      {/* Step 4: Confirmation */}
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
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <div className="button-group">
            <button type="button" onClick={handlePrevious}>
              Back
            </button>
            <button type="button" onClick={handleSubmit}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Booking Success */}
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
