import React from "react";
import { useState, useEffect } from "react";
import "./HomeProductSection.css";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Loader from "../../components/Loader";
import "react-multi-carousel/lib/styles.css";

function HomeProductSection() {
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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const ProductData = [
  //   {
  //     id: 1,
  //     imageURL:
  //       "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     name: "Sport",
  //     price: 19.99,
  //     description: "product description",
  //   },
  //   {
  //     id: 2,
  //     imageURL:
  //       "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80",
  //     name: "nike",
  //     price: 18.99,
  //     description: "product description",
  //   },
  //   {
  //     id: 3,
  //     imageURL:
  //       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80",
  //     name: "adidas",
  //     price: 15.99,
  //     description: "product description",
  //   },
  //   {
  //     id: 4,
  //     imageURL:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNlbmjCIXC3hv2bDgGM9SsyV9qFofvX5mXuUpMFOgnC0q5deJUWa5jQPoDrEOZ0VKZCwg&usqp=CAU",
  //     name: "puma",
  //     price: 14.99,
  //     description: "product description",
  //   },
  //   {
  //     id: 5,
  //     imageURL:
  //       "https://cdn.shopify.com/s/files/1/0529/5269/4973/products/8932947eb00350e181f6fa7f1e979faf_675x.progressive.jpg?v=1667018725",
  //     name: "new balance",
  //     price: 13.99,
  //     description: "product description",
  //   },
  // ];
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const nodeEnv = process.env.REACT_APP_URL;
  const getAllProducts = () => {
    axios
      .get(`${nodeEnv}/products`)
      .then((res) => {
        setProduct(res.data.docs);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setLoading(false);
  };

  useEffect(getAllProducts, []);

  return (
    <div>
      <div className="product-home-container">
        <h1 className="product-home-title">Products</h1>
        <Carousel responsive={responsive}>
          {!product ? (
            <Loader />
          ) : (
            product.length > 7 &&
            product.slice(0,7).map((product) => (
              <div className="card">
                {/* <Loader border={'2px dotted black'}  />  */}
                <img
                  className="product--image"
                  src={product.image}
                  alt={product.title}
                />
                <h2>{product.title}</h2>
                <p className="price">{product.price}$</p>
                <p>{product.description}</p>
                <p>
                  <button
                    onClick={() => {
                      addProductToCart(product);
                    }}
                  >
                    add to cart{" "}
                  </button>
                </p>
              </div>
            ))
          )}
        </Carousel>
        ;
      </div>
    </div>
  );
}

export default HomeProductSection;
