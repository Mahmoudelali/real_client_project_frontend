import React, { useEffect, useState } from "react";
import "./UserProducts.css";
import cookie from "react-cookies";
import axios from "axios";
import Loader from "../Loader";
import { Pagination } from "antd";

function UserProducts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDocs, setTotalDocs] = useState();

    useEffect(() => {
        productsData();
    }, [currentPage]);

    const changePage = () => {
        productsData();
    };

    const productsData = () => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_URL}/products/user-product?page=${currentPage}`,
                { user_id: `${cookie.load("user")._id}` },
                {
                    headers: { auth_token: cookie.load("auth_token") },
                }
            )
            .then((res) => {
                console.log(res);
                setCurrentPage(res.data.page);
                setTotalDocs(res.data.totalDocs);
                setData(res.data.docs);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    console.log(data);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {data && data !== [] && (
                        <>
                            <hr />
                            <h2 className="user-product-title">Products Posted</h2>

                            {data.map((product) => {
                                return (
                                    <section className="user-product-whole" key={product._id}>
                                        <hr />
                                        <img
                                            src={`${process.env.REACT_APP_URL}/${product.image}`}
                                            alt="User product"
                                            className="user-product-image"
                                        />
                                        <section className="user-product-informations">
                                            <p className="user-product-info">
                                                Title: {product.title}
                                            </p>
                                            <p className="user-product-info">
                                                Description: {product.description}
                                            </p>
                                            <p className="user-product-info">
                                                Price: {product.price}
                                            </p>
                                            <p className="user-product-info">
                                                Condition: {product.condition}
                                            </p>
                                            <p className="user-product-info">
                                                State: {product.state}
                                            </p>
                                        </section>
                                    </section>
                                );
                            })}
                            <div className="user-product-pagination-container">
                                <Pagination
                                    defaultCurrent={currentPage}
                                    onChange={(page) => setCurrentPage(page)}
                                    total={totalDocs}
                                    pageSize={3}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default UserProducts;
