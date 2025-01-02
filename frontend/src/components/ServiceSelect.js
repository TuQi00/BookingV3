import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceSelect = ({ value, onChange, categoryId }) => {
  const [services, setServices] = useState([]); // Change from 'subservices' to 'services'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryId) {
      setServices([]); // Clear services if no categoryId
      return;
    }

    setLoading(true);
    setError(""); // Reset any previous error
    axios
      .get(`http://localhost:5000/api/services/${categoryId}/services`) // Change endpoint to match services
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setServices(res.data.data); // Update with the actual services data
        } else {
          console.error("Invalid API response:", res.data);
          setError("No services found");
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div>
      <label>Select Service:</label> {/* Updated label */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!categoryId || loading}
      >
        <option value="">Select a service</option>
        {services.length > 0 ? (
          services.map(
            (
              service // Change from 'subservices' to 'services'
            ) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            )
          )
        ) : (
          <option value="" disabled>
            No services available
          </option>
        )}
      </select>
      {loading && <p>Loading services...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ServiceSelect;
