import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/products/category/${categoryId}`);
      console.log(response.data)
      setCategoryData(response.data.docs);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {categoryData&&categoryData.map((data) => (
        <div key={data.id}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
