import React, { useEffect, useState } from "react";
import "./VisitorUnauth.css";
import { Navigate } from "react-router-dom";

function VisitorUnauth() {
    const [navigate, setNavigate] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setNavigate(true);
        }, 5000);
        return clearTimeout();
    }, []);
    return (
        <>
            {navigate && <Navigate to="/" replace={true} />}
            <div className="visitor-unauthorized">
                <h1>UNAUTHORIZED ACCESS!</h1>
            </div>
        </>
    );
}

export default VisitorUnauth;
