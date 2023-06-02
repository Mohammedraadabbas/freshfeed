import axios from "../api/axios";
import  { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VerifyRegister = () => {
    let { setAuth } = useAuth();
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
