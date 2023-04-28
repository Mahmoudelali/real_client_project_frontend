import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeCategorySection.css';

function HomeCategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/category`);
      setCategories(response.data);
      console.log("Categories fetched successfully:", response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="category-container">
      {loading ? (
        <div>Loading categories...</div>
      ) : (
        Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => {
            console.log("Rendering category:", category);
            return (
              <div key={category.id} className="category-circle">
                {category.name}
              </div>
            )
          })
        ) : (
          null
        )
      )}
    </div>
  );
}

export default HomeCategorySection;
