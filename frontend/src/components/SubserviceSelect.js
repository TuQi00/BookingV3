import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubserviceSelect = ({ value, onChange, serviceId }) => {
  const [subservices, setSubservices] = useState([]);

  useEffect(() => {
    if (serviceId) {
      axios.get(`http://localhost:5000/api/subservices/${serviceId}`)
        .then(res => {
          setSubservices(res.data);
        })
        .catch(err => {
          console.error('Error fetching subservices:', err);
        });
    }
  }, [serviceId]);

  return (
    <div>
      <label>Select Subservice:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a subservice</option>
        {subservices.map(subservice => (
          <option key={subservice._id} value={subservice._id}>{subservice.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SubserviceSelect;
