import React, { useEffect, useState } from "react";
import "./UserProducts.css";
import cookie from "react-cookies";
import axios from "axios";
import Loader from "../Loader";

function UserProducts() {
    const [data, setData] = useState({});
    const [productImage, setProductImage] = useState("");
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
                            {data.map((product) => {
                                { console.log(`${process.env.REACT_APP_URL}/${product.image}`) }
                                <section className="product-whole">
                                    <img
                                        src={`${process.env.REACT_APP_URL}/${product.image}`}
                                        alt="User product"
                                        className="product-image"
                                    />
                                    <section className="product-informations">
                                        {/* <p className="product-info">Username: {user.username}</p>
                            {user.email && <p className="product-info">Email: {user.email}</p>}
                            {user.phone && <p className="product-info">Phone: {user.phone}</p>} */}
                                    </section>
                                </section>

                            })}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default UserProducts;
