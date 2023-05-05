import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { NavLink, useNavigate } from "react-router-dom";
import "./HomeCategorySection.css";

function HomeCategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URL}/category`);
      setCategories(response.data.response.docs);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    // localStorage.setItem("selectedCategoryId", categoryId);
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div>
      <h1 className="category-header">Categories</h1>
      <div className="category-container">
        {loading ? (
          <Loader />
        ) : Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className="category-circle"
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
}

export default HomeCategorySection;
