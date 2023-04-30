import React, { useEffect, useState } from "react";
import "./Profile.css";
import cookie from "react-cookies";
import axios from "axios";
import Loader from "../Loader";
import UserProducts from "../userProducts/UserProducts";

function Profile() {
    const [user, setUser] = useState({});
    const [profileImage, setProfileImage] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        userData();
    }, []);

    const userData = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_URL}/user/${cookie.load("user")._id}`, {
                headers: { auth_token: cookie.load("auth_token") },
            })
            .then((res) => {
                setProfileImage(res.data.imagePath);
                setUser(res.data.response);
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
                    <section className="profile-whole">
                        <img
                            src={profileImage}
                            alt="User Profile"
                            className="profile-image"
                        />
                        <section className="profile-informations">
                            <p className="profile-info">Username: {user.username}</p>
                            {user.email && (
                                <p className="profile-info">Email: {user.email}</p>
                            )}
                            {user.phone && (
                                <p className="profile-info">Phone: {user.phone}</p>
                            )}
                        </section>
                    </section>
                    <UserProducts />
                </>
            )}
        </>
    );
}

export default Profile;
