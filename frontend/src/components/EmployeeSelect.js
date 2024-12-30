import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSelect = ({ value, onChange, subserviceId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.employees)) {
          setEmployees(res.data.employees);
        } else {
          console.error("Invalid API response:", res.data);
          setEmployees([]);
        }
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <label>Select Employee:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!subserviceId || loading}
      >
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
      </select>
      {loading && <p>Loading employees...</p>}
    </div>
  );
};

export default EmployeeSelect;
