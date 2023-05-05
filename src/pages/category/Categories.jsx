import React, { useState, useEffect } from "react";
import axios from "axios";
// import CategoImage from "../../images/pexels-caleb-oquendo-3038455.jpg";
import Loader from "../../components/Loader";
import "./category.css";

function Categories ()  {
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

  return (
    <div>
       <div className="category-hero-section">
        {/* <img src={CategoImage} alt="Category Image" /> */}
        <h1 className="catego-content">This is a custom category page for khizana</h1>
        </div>
      <h1 className="catego-header">Categories</h1>
      <div className="catego-container">
        {loading ? (
          <Loader/>
          // <div>Loading categories...</div>
        ) : Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => {
            return (
              <div key={category.id} className="catego-circle">
                {category.name}
                <p className="description">{category.description}</p>
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
};

export default Categories;
