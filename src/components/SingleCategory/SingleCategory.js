import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import image1 from "../../images/jacket-preview.png";
import "./SingleCategory.css";
import { Pagination } from "antd";

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
      <img src={image1} alt={title} className="cards-image" />
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const pageSize = 10; 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/products`, {
        params: {
          page: currentPage,
          pageSize,
        },
      });
      console.log(response.data);
      setCategoryData(response.data.docs);
      setTotalDocs(response.data.totalDocs);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching category data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="categoryy-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {categoryData.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
          <div className="category-pagination-container">
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={totalDocs}
              pageSize={pageSize}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Category;
