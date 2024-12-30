import React, { useState, useEffect } from "react";
import axios from "axios";

const SubserviceSelect = ({ value, onChange, serviceId }) => {
  const [subservices, setSubservices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!serviceId) {
      setSubservices([]); // Clear subservices if no serviceId
      return;
    }

    setLoading(true);
    setError(""); // Reset any previous error
    axios
      .get(`http://localhost:5000/api/subservices/${serviceId}/subservices`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setSubservices(res.data.data); // Update with the actual subservices data
        } else {
          console.error("Invalid API response:", res.data);
          setError("No subservices found");
          setSubservices([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching subservices:", err);
        setError("Failed to load subservices");
        setSubservices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serviceId]);

  return (
    <div>
      <label>Select Subservice:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!serviceId || loading}
      >
        <option value="">Select a subservice</option>
        {subservices.length > 0 ? (
          subservices.map((subservice) => (
            <option key={subservice._id} value={subservice._id}>
              {subservice.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No subservices available
          </option>
        )}
      </select>

      {loading && <p>Loading subservices...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SubserviceSelect;
