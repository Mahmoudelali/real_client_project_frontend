import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/order`); 
      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Order Total: {order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
