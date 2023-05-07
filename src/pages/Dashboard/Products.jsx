import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader.jsx";
import Product from "../../components/Product.jsx";
import { NavLink, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Cookies from "js-cookie";
import { isLoading } from "../../App.js";
import { Pagination } from "antd";

const productTitles = [
  "Name",
  "Image",
  "Price",
  "Condition",
  "Visible",
  "On Page",
  "Category",
  "Edit",
  "Delete",
];

const Products = () => {
  const [Loading, setLoading] = useContext(isLoading);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const nodeEnv = process.env.REACT_APP_URL;
  const [products, setProducts] = useState(null);
  const [productData, setProductData] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const pageSize = 10;

  const getAllProducts = () => {
    axios
      .get(`${nodeEnv}/products/`, {
        headers: { auth_token: Cookies.get("auth_token") },
      })
      .then((res) => {
        console.log(res.data.docs);
        setProducts(res.data.docs);
        setTotalDocs(res.data.totalDocs);
        setLoading(false);
      });
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  return (
    <div className="products-container">
      {!products ? (
        <Loader isComponent={true} />
      ) : (
        <div>
          <h2 className="title center">PRODUCTS</h2>

          <table>
            <thead>
              <tr>
                <td style={{ padding: 0 }}>
                  <form style={{ marginBottom: "10px" }}>
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
                {productTitles.map((title, index) => {
                  return <th key={index}>{title.toUpperCase()}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {products
                .filter((user) => {
                  return (
                    search.toLocaleLowerCase() === "" ||
                    user.title.toLowerCase().includes(search) ||
                    user.condition.toLowerCase().includes(search) ||
                    user.description.toLowerCase().includes(search) ||
                    user.state.toLowerCase().includes(search)
                  );
                })
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map(
                  ({
                    title,
                    price,
                    image,
                    _id,
                    onPage,
                    category,
                    condition,
                  }) => (
                    <Product
                      isLoading={Loading}
                      setIsLoading={setLoading}
                      getAllProducts={getAllProducts}
                      onPage={onPage ? onPage : null}
                      key={_id}
                      category={category}
                      title={title}
                      price={price}
                      image={image}
                      _id={_id}
                      condition={condition}
                    />
                  )
                )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} style={{ border: "0" }}>
                  <span>
                    <strong>Total</strong> : {products.length}
                  </span>
                </td>
                <td colSpan={2} style={{ border: "0" }}>
                  <strong>On Page</strong> :{" "}
                  {products.filter((item) => item.onPage === true).length}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="dashboard-products-pagination-container">
            <Pagination
              current={currentPage}
              onChange={changePage}
              total={totalDocs}
              pageSize={pageSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
