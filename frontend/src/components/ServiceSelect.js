import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceSelect = ({ value, onChange }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.services)) {
          setServices(res.data.services);
        } else {
          console.error("Invalid API response:", res.data);
          setServices([]);
        }
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <label>Select Service:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">Select a service</option>
        {services.map((service) => (
          <option key={service._id} value={service._id}>
            {service.name}
          </option>
        ))}
      </select>
      {loading && <p>Loading services...</p>}
    </div>
  );
};

export default ServiceSelect;
