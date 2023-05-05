import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Product.css";

const Product = ({ category, productId }) => {
  const { category, productId } = useParams();

  return (
    <div to={`/categories/${productId}`}>
      <h1>{category} Product Page</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default Product;
