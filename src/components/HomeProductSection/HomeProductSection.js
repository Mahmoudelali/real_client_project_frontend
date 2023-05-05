import React from "react";
import "./HomeProductSection.css";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HomeProductSection() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
  return (
    <div className="carousel-container">
      <h1 className="product-header">Products</h1>
      <Carousel responsive={responsive}>
        <div className="card">
            <img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p>
        </div>
        <div className="card"><img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p></div>
        <div className="card"><img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p></div>
        <div className="card"><img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p></div>
            <div className="card">
            <img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p>
        </div>
        <div className="card">
            <img className="product--image"
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />  
            <h2>product name</h2>
            <p className="price">20.09 $</p>
            <p>product descreption </p>
            <p>
                <button>add to cart</button>
            </p>
        </div>
      </Carousel>
      ;
    </div>
  );
}

export default HomeProductSection;
