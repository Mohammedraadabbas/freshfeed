import AuthContext, { AuthContextValue } from "../context/AuthProvider";
import {useContext} from "react"

const useAuth = () => {
     return useContext(AuthContext) as AuthContextValue;
};

export default useAuth;