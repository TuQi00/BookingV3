import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import CategorySelect from "./CategorySelect";
import ServiceSelect from "./ServiceSelect";
import EmployeeSelect from "./EmployeeSelect";

const BookingForm = () => {
  const [step, setStep] = useState(1); // Current step
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(""); // Renamed from service to category
  const [service, setService] = useState(""); // Renamed from subservice to service
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState(""); // Renamed from serviceName
  const [serviceDetails, setServiceDetails] = useState({}); // Renamed from subserviceDetails
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState(""); // To store employee's image

  // Fetch category, service, employee details
  const fetchDetails = async (type, id, categoryId) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/${type}/${id}`;

      if (type === "services" && categoryId) {
        url = `http://localhost:5000/api/services/${categoryId}/services/${id}`; // Use categoryId and serviceId
      }

      const response = await axios.get(url);
      if (response.data.success) {
        if (type === "categories") setCategoryName(response.data.data.name); // For category
        if (type === "services") {
          setServiceDetails(response.data.data); // For service
        }
        if (type === "employees") {
          setEmployeeName(response.data.data.name);
          setEmployeeImage(response.data.data.image); // Assuming the employee data includes an 'image' field
        }
      } else {
        throw new Error("Failed to fetch details");
      }
    } catch (err) {
      console.error(`Error fetching ${type} details:`, err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) fetchDetails("categories", category); // Fetch category details
  }, [category]);

  useEffect(() => {
    if (category && service) fetchDetails("services", service, category); // Fetch service details with categoryId
  }, [category, service]);

  useEffect(() => {
    if (employee) fetchDetails("employees", employee);
  }, [employee]);

  const handleServiceSubmit = (event) => {
    event.preventDefault();
    if (!category || !service || !employee || !date || !time) {
      setError("All fields are required");
      return;
    }
    setError("");
    setStep(2); // Move to step 2: Confirm
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
      const bookingData = { email, category, service, employee, date, time };
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      if (response.data.success) {
        setStep(4); // Go to step 4: Booking successful
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
    setStep(1); // Go back to step 1
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

      {/* Step 1: Category & Service Selection */}
      {step === 1 && (
        <form onSubmit={handleServiceSubmit}>
          <CategorySelect value={category} onChange={setCategory} />
          <ServiceSelect
            value={service}
            onChange={setService}
            categoryId={category} // Pass categoryId to fetch services
          />
          {service && serviceDetails && (
            <div className="service-container">
              <h3>{serviceDetails.name}</h3>
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
            serviceId={service} // Pass serviceId to fetch employees
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
            <strong>Category:</strong> {categoryName}
          </p>
          <p>
            <strong>Service:</strong> {serviceDetails.name}
          </p>
          <p>
            <strong>Price:</strong> ${serviceDetails.price}
          </p>
          <p>
            <strong>Description:</strong> {serviceDetails.description}
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
          <label>Infomation:</label>
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
            <strong>Category:</strong> {categoryName}
          </p>
          <p>
            <strong>Service:</strong> {serviceDetails.name}
          </p>
          <p>
            <strong>Price:</strong> ${serviceDetails.price}
          </p>
          <p>
            <strong>Description:</strong> {serviceDetails.description}
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
