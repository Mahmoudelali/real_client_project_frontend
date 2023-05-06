import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import "./SingleCategory.css";

function Card({ title, price, description, imageUrl }) {
  console.log(title, price, description, imageUrl);
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  return (
    <div className="cards">
      <img src={imageUrl} alt={title} className="cards-image" />
      <div className="cards-content">
        <h2 className="cards-title">{title}</h2>
        <p className="cards-price">{price}$</p>
        <p className="cards-description">{description}</p>
        <button
          className="cards-button"
          onClick={() =>
            addProductToCart({ title, price, description, imageUrl })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/products`);
      console.log(response.data);
      setCategoryData(response.data.docs);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching category data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="categoryy-container">
      {loading ? (
        <Loader />
      ) : (
        categoryData &&
        categoryData.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            price={data.price}
            $
            description={data.description}
            imageUrl={data.imageUrl}
          />
        ))
      )}
    </div>
  );
}

export default Category;
