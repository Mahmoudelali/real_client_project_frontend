import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Loader from "../../components/Loader";
import "../Dashboard/dashboard.css";
import OrderRow from "../../components/OrderRow";
import { isLoading } from "../../App";
import { Pagination } from "antd";

const Pending = () => {
  const orderTableTitles = [
    "orderedBy",
    "email",
    "address",
    "product",
    "total",
    "message",
    "_id",
    "approve",
    "delete",
  ];
  const nodeEnv = process.env.REACT_APP_URL;
  const [pendingOrders, setPendingOrders] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useContext(isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState();

  const pageSize = 10;

  const getAllOrders = () => {
    axios
      .get(`${nodeEnv}/order`, {
        headers: {
          auth_token: Cookies.get("auth_token"),
        },
      })
      .then((res) => {
        console.log(res.data.docs);
        setTotalDocs(res.data.totalDocs);
        setPendingOrders(
          res.data.docs.filter((doc) => {
            return doc.state === "pending";
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(getAllOrders, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return !pendingOrders || loading ? (
    <Loader isComponent={true} />
  ) : (
    <div className="orders-container">
      <h2 className="title center">Pending Orders</h2>

      <table>
        <thead>
          <tr>
            <td style={{ padding: 0 }}>
              <form style={{ marginBottom: "10px" }} className="w-100">
                <input
                  placeholder="Search"
                  type="text"
                  className="input"
                  style={{
                    display: "block",
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
            </td>
          </tr>
          <tr>
            {orderTableTitles.map((title, index) => {
              return <th key={index}>{title.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pendingOrders &&
            pendingOrders
              .filter((order) => {
                return order.state === "pending";
              })
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map(({ address, message, total, user_id, _id }) => (
                <OrderRow
                  isPending={true}
                  key={_id}
                  address={address}
                  message={message}
                  total={total}
                  username={user_id.username}
                  email={user_id.email}
                  _id={_id}
                  getAllOrders={getAllOrders}
                />
              ))}
          <tr>
            <td>
              <strong>Total </strong>: {pendingOrders.length}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dashboard-pending-pagination-container">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={totalDocs}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default Pending;
