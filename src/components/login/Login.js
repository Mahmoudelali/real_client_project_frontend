import React, { useRef, useState, useContext } from "react";
import "./Login.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";
import cookie from "react-cookies";
import { isLoggedIn } from "../../App";

function Login() {
    const [err, setErr] = useState("");
    const emailOrPhone = useRef();
    const password = useRef();

    const [loggedIn, setLoggedIn] = useContext(isLoggedIn);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                console.log(response);
                cookie.save("user", JSON.stringify(response.data.response), {
                    maxAge: 5 * 60 * 60 * 1000,
                });
                cookie.save("auth_token", response.data.token, {
                    maxAge: 5 * 60 * 60 * 1000,
                });
                setErr("");
                setLoggedIn(true);
            })
            .catch((error) => {
                console.log(error);
                if (error.response === undefined) {
                    setErr(error.message);
                } else {
                    setErr(error.response.data.err);
                }
            });
    };

    return (
        <>
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
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;
