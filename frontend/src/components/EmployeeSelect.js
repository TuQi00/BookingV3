import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeSelect = ({ value, onChange, subserviceId }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (subserviceId) {
      axios.get(`http://localhost:5000/api/employees`)
        .then(res => {
          setEmployees(res.data);
        })
        .catch(err => {
          console.error('Error fetching employees:', err);
        });
    }
  }, [subserviceId]);

  return (
    <div>
      <label>Select Employee:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select an employee</option>
        {employees.map(employee => (
          <option key={employee._id} value={employee._id}>{employee.name}</option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelect;
