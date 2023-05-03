import React, { useRef, useState, useContext } from "react";
import "./Register.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";
import cookie from "react-cookies";
import { isLoggedIn } from "../../App";
import { Link, Navigate } from "react-router-dom";

function Register() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [phoneError, setPhoneError] = useState(true);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const phone = useRef();
    const image = useRef();

    const [loggedIn, setLoggedIn] = useContext(isLoggedIn);

    const handlePhoneNumber = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
        const countryCode = value.substring(0, 3);

        const parsedPhoneNumber = parsePhoneNumberFromString(value, countryCode);
        setIsValidPhone(parsedPhoneNumber && parsedPhoneNumber.isValid());
    };

    const handlePhoneError = () => {
        if (!isValidPhone) {
            setPhoneError(false);
        } else if (isValidPhone) {
            setPhoneError(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("username", username.current.value);
        formData.append("phone", phone.current.value);
        formData.append("email", email.current.value);
        formData.append("password", password.current.value);
        formData.append("image", image.current.files[0]);
        axios
            .post(`${process.env.REACT_APP_URL}/user/register`, formData)
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
            {loggedIn && <Navigate to="/" replace={true} />}
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Create an account</h2>
                <label htmlFor="username" className="register-label">
                    Username
                </label>

                <input
                    ref={username}
                    type="text"
                    id="username"
                    name="username"
                    className="register-input"
                    placeholder="username"
                    minLength={3}
                    required
                />

                <label htmlFor="email" className="register-label">
                    Email
                </label>

                <input
                    ref={email}
                    type="email"
                    id="email"
                    name="email"
                    className="register-input"
                    placeholder="email@gmail.com"
                />

                <label htmlFor="phoneNumber" className="register-label">
                    Phone
                </label>

                <input
                    ref={phone}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                    onBlur={handlePhoneError}
                    placeholder="+961 71 123 456"
                    className="register-input"
                />
                {!phoneError && (
                    <div
                        className="register-error-message"
                        style={{ marginBottom: "1pc" }}
                    >
                        Invalid phone number
                    </div>
                )}

                <label htmlFor="password" className="register-label">
                    Password
                </label>

                <input
                    ref={password}
                    type="password"
                    id="password"
                    name="password"
                    className="register-input"
                    placeholder="password"
                    minLength={8}
                    required
                />

                <label htmlFor="image" className="register-label">
                    Image
                </label>

                <input
                    ref={image}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    className="register-input"
                    required
                />
                {err !== "" && err && (
                    <div
                        className="register-error-message"
                        style={{ marginBottom: "1pc" }}
                    >
                        {err}
                    </div>
                )}

                <button type="submit" className="register-button">
                    {loading ? "Checking..." : "Register"}
                </button>
                <p className="register-link">
                    Already a user? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    );
}

export default Register;
