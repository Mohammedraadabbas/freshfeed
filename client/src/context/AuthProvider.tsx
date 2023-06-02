import { ReactNode, createContext, useState } from "react";

type AuthContextValue = {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextValue | {}>({});

export const AuthProvider = ({ children }:{children: ReactNode}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
