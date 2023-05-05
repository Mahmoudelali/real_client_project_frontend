import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import "./category.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/category`);
      setCategories(response.data.response.docs);
      console.log(categories);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
    setLoading(false);
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
      <div className="category-hero-section">
        <h1 className="catego-content">
          This is a custom category page for khizana
        </h1>
      </div>
      <h1 className="catego-header">Categories</h1>
      <div className="catego-container">
        {loading ? (
          <Loader />
        ) : Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => {
            return (
              <div
                key={category.id}
                className="catego-circle"
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
                <p className="description">{category.description}</p>
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
}

export default Categories;
