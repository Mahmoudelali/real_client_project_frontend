import React from "react";
import "./ShoppingCart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
const cartTitle = ["image", "Name", "Price", "Delete", "Order Now"];

function ShoppingCart({ products, onProductRemove }) {
  const iconStyles = {
    transition: "color 0.3s, transform 0.3s",
    "&:hover": {
      color: "var(--accent)",
      transform: "scale(1.2) ",
    },
  };

  return (
    <div className="cart-modal">
      <div className="cart-shoppingCart">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
        </div>
        <table>
          <thead>
            <tr>
              {cartTitle.map((title, index) => {
                return <th key={index}>{title.toUpperCase()} </th>;
              })}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={cartTitle.length} className="cart-empty-text">
                  Your basket is currently empty
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="cart-image-container">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="cart-img"
                    />
                  </div>
                </td>
                <td>
                  <div className="cart-product-info">{product.name}</div>
                </td>
                <td>
                  <span className="cart-product-price">
                    <strong>{product.price}</strong>

                    <i> $</i>
                  </span>
                </td>
                <td style={{ color: "#dc3545" }}>
                  <button
                    className="btn cart-btn cart-remove-btn"
                    onClick={() => onProductRemove(product)}
                  >
                    <Grid>
                      <DeleteIcon sx={iconStyles} />
                    </Grid>
                  </button>
                </td>
                <td style={{ color: "black" }} >
                  <button className="btn ">
                    <Link to="/orders">
                      <LocalGroceryStoreIcon/>
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ShoppingCart;
