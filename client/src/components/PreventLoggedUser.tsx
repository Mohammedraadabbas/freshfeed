import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreventLoggedUser = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        null
    );
};

export default PreventLoggedUser;
