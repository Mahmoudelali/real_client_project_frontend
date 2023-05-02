import React, { useEffect, useState } from "react";
import "./UserProducts.css";
import cookie from "react-cookies";
import axios from "axios";
import Loader from "../Loader";

function UserProducts() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        productsData();
    }, []);

    const productsData = () => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_URL}/products/user-product`,
                { user_id: `${cookie.load("user")._id}` },
                {
                    headers: { auth_token: cookie.load("auth_token") },
                }
            )
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {data && (
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
                                            <p className="user-product-info">Title: {product.title}</p>
                                            <p className="user-product-info">State: {product.state}</p>
                                        </section>

                                    </section>
                                );
                            })}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default UserProducts;
