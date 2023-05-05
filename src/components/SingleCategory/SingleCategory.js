import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleCategory.css";

function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/products`
      );
      console.log(response.data);
      setCategoryData(response.data.docs);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="category-container">
      {categoryData &&
        categoryData.map((data) => (
          <div key={data.id} className="card">
            <img src={data.imageUrl} alt={data.title} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{data.title}</h2>
              <p className="card-description">{data.description}</p>
              <button className="card-button">Buy Now</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Category;
