import React, { useState, useEffect } from "react";
import axios from "axios";

const CategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data); // Accessing 'data' instead of 'categories'
        } else {
          console.error("Invalid API response:", res.data);
          setCategories([]);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <label>Select Category:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {loading && <p>Loading categories...</p>}
    </div>
  );
};

export default CategorySelect;
