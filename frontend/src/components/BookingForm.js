// BookingForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import ServiceSelect from "./ServiceSelect";
import SubserviceSelect from "./SubserviceSelect";
import EmployeeSelect from "./EmployeeSelect";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [subservice, setSubservice] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [subserviceName, setSubserviceName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    if (service) {
      axios
        .get(`http://localhost:5000/api/services/${service}`)
        .then((res) => setServiceName(res.data.data.name))
        .catch((err) => console.error("Error fetching service name:", err));
    }
  }, [service]);

  useEffect(() => {
    if (service && subservice) {
      axios
        .get(
          `http://localhost:5000/api/subservices/${service}/subservices/${subservice}`
        )
        .then((res) => setSubserviceName(res.data.data.name))
        .catch((err) => console.error("Error fetching subservice name:", err));
    }
  }, [service, subservice]);

  useEffect(() => {
    if (employee) {
      axios
        .get(`http://localhost:5000/api/employees/${employee}`)
        .then((res) => setEmployeeName(res.data.data.name))
        .catch((err) => console.error("Error fetching employee name:", err));
    }
  }, [employee]);

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    setStep(2);
  };

  const handleNextStep = (event) => {
    event.preventDefault();
    setError("");

    if (!service || !subservice || !employee || !date || !time) {
      setError("All fields are required");
      return;
    }

    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setError("");

    if (!service || !subservice || !employee || !date || !time) {
      setError("All fields are required.");
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
        setBookingDetails(response.data.booking);
        setStep(4);
      } else {
        setError(response.data.msg || "Unexpected error occurred.");
      }
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Error submitting booking. Please try again.");
      }
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
    setStep(1);
    setError("");
  };

  return (
    <div className="booking-form-container">
      <header>
        <h2>Booking Application</h2>
      </header>
      <div className="step-indicator">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          Step 1: Email
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          Step 2: Details
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          Step 3: Confirm
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Validating..." : "Next"}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleNextStep}>
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
          <button type="submit">Next</button>
        </form>
      )}
      {step === 3 && (
        <div>
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
          <button onClick={handleFinalSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      )}
      {step === 4 && bookingDetails && (
        <div>
          <h2>Booking Confirmed!</h2>
          <p>
            <strong>Service:</strong> {bookingDetails.service}
          </p>
          <p>
            <strong>Subservice:</strong> {bookingDetails.subservice}
          </p>
          <p>
            <strong>Employee:</strong> {bookingDetails.employee}
          </p>
          <p>
            <strong>Date:</strong> {bookingDetails.date}
          </p>
          <p>
            <strong>Time:</strong> {bookingDetails.time}
          </p>
          <button onClick={resetForm}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
