import React, { useState, useEffect } from "react";
import axios from "axios";

const CategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          console.error("Invalid API response:", res.data);
          setError("No categories found");
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        <option value="">Select a category</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No categories available
          </option>
        )}
      </select>
      {loading && <p>Loading categories...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CategorySelect;
