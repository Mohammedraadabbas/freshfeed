import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PreventLoggedUser = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    return auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        null
    );
};

export default PreventLoggedUser;
