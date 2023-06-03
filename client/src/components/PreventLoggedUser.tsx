import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreventLoggedUser = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth)
    return auth?._id != null? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet/>
    );
};

export default PreventLoggedUser;
