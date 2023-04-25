import React, { useRef, useState } from "react";
import "./Register.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";
import cookie from "react-cookies";

function Register() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [phoneError, setPhoneError] = useState(true);
    const [err, setErr] = useState("");
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const phone = useRef();
    const image = useRef();

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
                    placeholder="Email"
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
                    Register
                </button>
            </form>
        </>
    );
}

export default Register;
