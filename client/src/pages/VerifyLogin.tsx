import axios from "../api/axios";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VerifyLogin = () => {
    const [error, setError] = useState("");
    const { setAuth } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(`login/verify/${token}`, {
                    withCredentials: true,
                });
                const { accessToken, user } = res.data;
                setAuth({ accessToken, user });
            } catch (err) {
                setError(err.response.data.error);
            }
        };

        verify();
    }, [setAuth, token]);

    return <div>{error !== "" ? <div>{error}</div> : <div>{token}</div>}</div>;
};

export default VerifyLogin;
