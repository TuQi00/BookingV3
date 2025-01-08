import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceSelect = ({ categoryId, value, onChange }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryId) {
      setServices([]);
      return;
    }

    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:5000/api/services/${categoryId}/services`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setServices(res.data.data);
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

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <select
        className="select-container"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Select a service</option>
        {services.length > 0 ? (
          services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))
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
