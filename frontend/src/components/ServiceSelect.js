import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceSelect = ({ value, onChange }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
      });
  }, []);

  return (
    <div>
      <label>Select Service:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a service</option>
        {services.map(service => (
          <option key={service._id} value={service._id}>{service.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ServiceSelect;
