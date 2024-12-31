import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import ServiceSelect from "./ServiceSelect";
import SubserviceSelect from "./SubserviceSelect";
import EmployeeSelect from "./EmployeeSelect";

const BookingForm = () => {
  const [step, setStep] = useState(1); // Bước hiện tại
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [subservice, setSubservice] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [subserviceName, setSubserviceName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  // Fetch service, subservice, employee details
  const fetchDetails = async (type, id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/${type}/${id}`
      );
      if (response.data.success) {
        if (type === "services") setServiceName(response.data.data.name);
        if (type === "subservices") setSubserviceName(response.data.data.name);
        if (type === "employees") setEmployeeName(response.data.data.name);
      } else {
        throw new Error("Failed to fetch details");
      }
    } catch (err) {
      console.error(`Error fetching ${type} name:`, err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (service) fetchDetails("services", service);
  }, [service]);

  useEffect(() => {
    if (service && subservice)
      fetchDetails("subservices", `${service}/subservices/${subservice}`);
  }, [service, subservice]);

  useEffect(() => {
    if (employee) fetchDetails("employees", employee);
  }, [employee]);

  const handleServiceSubmit = (event) => {
    event.preventDefault();
    if (!service || !subservice || !employee || !date || !time) {
      setError("All fields are required");
      return;
    }
    setError("");
    setStep(2); // Chuyển sang bước xác nhận
  };

  const handleEmailSubmit = async () => {
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      const bookingData = { email, service, subservice, employee, date, time };
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      if (response.data.success) {
        setStep(4); // Chuyển sang bước xác nhận email
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
    setService("");
    setSubservice("");
    setEmployee("");
    setDate("");
    setTime("");
    setStep(1); // Quay lại bước đầu tiên
    setError("");
  };

  return (
    <div className="booking-form-container">
      <header>
        <h2>Booking Application</h2>
      </header>
      <div className="step-indicator">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          Step 1: Service
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          Step 2: Confirm
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          Step 3: Email
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <form onSubmit={handleServiceSubmit}>
          <ServiceSelect value={service} onChange={setService} />
          <SubserviceSelect
            value={subservice}
            onChange={setSubservice}
            serviceId={service}
          />
          <EmployeeSelect
            value={employee}
            onChange={setEmployee}
            subserviceId={subservice}
          />
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
            <button type="submit" disabled={loading}>
              Next
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Confirm Selection */}
      {step === 2 && (
        <form>
          <h2>Confirm Booking</h2>
          <p>
            <strong>Service:</strong> {serviceName}
          </p>
          <p>
            <strong>Subservice:</strong> {subserviceName}
          </p>
          <p>
            <strong>Employee:</strong> {employeeName}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <div className="button-group">
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" onClick={() => setStep(3)}>
              Next
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Email Input */}
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
            <button type="button" onClick={() => setStep(2)}>
              Back
            </button>
            <button onClick={handleEmailSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div>
          <h2>Booking Successfully!</h2>
          <p>
            <strong>Service:</strong> {serviceName}
          </p>
          <p>
            <strong>Subservice:</strong> {subserviceName}
          </p>
          <p>
            <strong>Employee:</strong> {employeeName}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <button onClick={resetForm}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
