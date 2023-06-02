import axios from "../api/axios";
import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const VerifyRegister = () => {
    let { setAuth } = useContext(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    useEffect(() => {
        const verify = async () => {
            let res = await axios.get(`register/verify/${token}`, {
                withCredentials: true,
            });
            console.log(res);
            let { accessToken, user } = res.data;
            setAuth({ accessToken, user });
        };

        verify();
    }, [token]);

    return <div>{token}</div>;
};

export default VerifyRegister;
