import React, { useRef, useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import cookie from "react-cookies";
import { isLoggedIn } from "../../App";
import { Link, Navigate } from "react-router-dom";

function Login() {
    const [err, setErr] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const emailOrPhone = useRef();
    const password = useRef();

    const [loggedIn, setLoggedIn] = useContext(isLoggedIn);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let data = {};
        if (emailOrPhone.current.value.includes("@")) {
            data.email = emailOrPhone.current.value;
        } else {
            data.phone = emailOrPhone.current.value;
        }
        data.password = password.current.value;
        axios
            .post(`${process.env.REACT_APP_URL}/user/login`, data)
            .then((response) => {
                cookie.save("user", JSON.stringify(response.data.response), {
                    maxAge: 5 * 60 * 60 * 1000,
                });
                cookie.save("auth_token", response.data.token, {
                    maxAge: 5 * 60 * 60 * 1000,
                });
                setErr("");
                if (
                    response.data.response.role === "admin" ||
                    response.data.response.role === "superAdmin"
                ) {
                    setIsAdmin(true);
                }
                setLoggedIn(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                if (error.response === undefined) {
                    setErr(error.message);
                } else {
                    setErr(error.response.data.err);
                }
                setLoading(false);
            });
    };

    return (
        <>
            {loggedIn && isAdmin ? (
                <Navigate to="/admin/dashboard/" replace={true} />
            ) : (
                loggedIn && <Navigate to="/" replace={true} />
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                <label htmlFor="email" className="login-label">
                    Email or Phone
                </label>

                <input
                    ref={emailOrPhone}
                    type="text"
                    id="email-or-phone"
                    name="email-or-phone"
                    className="login-input"
                    placeholder="Email or Phone"
                    required
                />

                <label htmlFor="password" className="login-label">
                    Password
                </label>

                <input
                    ref={password}
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    placeholder="password"
                    minLength={8}
                    required
                />

                {err !== "" && err && (
                    <div className="login-error-message" style={{ marginBottom: "1pc" }}>
                        {err}
                    </div>
                )}

                <button type="submit" className="login-button">
                    {loading ? "Checking..." : "Login"}
                </button>
                <p className="login-link">
                    New user? <Link to="/register">Register</Link>
                </p>
            </form>
        </>
    );
}

export default Login;
