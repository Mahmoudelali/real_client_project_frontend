import React from "react";
import { useState, useEffect } from "react";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [productsInCart, setProducts] =
  useState(
    JSON.parse(
      localStorage.getItem(
        "shopping-cart"
      )
    ) || []
  );
useEffect(() => {
  localStorage.setItem(
    "shopping-cart",
    JSON.stringify(productsInCart)
  );
}, [productsInCart]);
  
const addProductToCart = (product) => {
  const newProduct = {
    ...product,
    count: 1,
  };
  setProducts([...productsInCart, newProduct]);
};

const onProductRemove = (product) => {
  setProducts((oldState) => {
    const productsIndex =
      oldState.findIndex(
        (item) =>
          item.id === product.id
      );
    if (productsIndex !== -1) {
      oldState.splice(productsIndex, 1);
    }
    return [...oldState];
  });
};

  return <div>
		<ShoppingCart
		products={productsInCart}
    onProductRemove={onProductRemove}
		/>
  </div>;
};

export default Cart;
