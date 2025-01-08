import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSelect = ({ value, onChange }) => {
  const [employees, setEmployees] = useState([]); // Đảm bảo employees là mảng mặc định
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/employees");
        console.log("API Response:", response); // Log để kiểm tra dữ liệu API
        if (response.data.success) {
          setEmployees(response.data.employees || []); // Sửa thành employees thay vì data
        } else {
          setError("Failed to fetch employees");
        }
      } catch (err) {
        setError("Error loading employees");
        console.error("Error:", err); // Log lỗi nếu có
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-select">
      <h3>Select Employee</h3>
      {loading && <p>Loading employees...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="employee-container">
        {employees.length > 0
          ? employees.map((employee) => (
              <div
                key={employee._id}
                className={`employee-card ${
                  value === employee._id ? "selected" : ""
                }`}
                onClick={() => onChange(employee._id)}
              >
                <img
                  src={employee.image || "default-image.jpg"}
                  alt={employee.name}
                  className="employee-image"
                />
                <p className="employee-name">{employee.name}</p>
              </div>
            ))
          : !loading && <p>No employees available.</p>}
      </div>
    </div>
  );
};

export default EmployeeSelect;
