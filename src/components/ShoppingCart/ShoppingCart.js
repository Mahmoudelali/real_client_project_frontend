import React from "react";
import "./ShoppingCart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function ShoppingCart({ products, onProductRemove }) {
  return (
    <div className="cart-modal">
      <div className="cart-shoppingCart">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="cart-empty-text">
              Your basket is currently empty
            </span>
          )}
          {products.map((product) => (
            <div className="cart-product" key={product.id}>
              <img
                src={product.imageURL}
                alt={product.name}
                className="cart-img"
              />
              <div className="cart-product-info">
                <h3 className="cart-h3title">{product.name}</h3>
                <span className="cart-product-price">{product.price} $</span>
              </div>
              <button
                className="cart-btn cart-remove-btn"
                onClick={() => onProductRemove(product)}
              >
                <RiDeleteBin6Line
                  className="cart-btn-delete"
                  size={39}
                  color={"white"}
                />
              </button>
              <Link className="cart-order" to="/orders">
                <button className="cart-btn-order">Order Now</button>
              </Link>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
