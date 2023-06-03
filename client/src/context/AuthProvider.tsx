import { ReactNode, createContext, useState } from "react";

export type User = {
    _id: string;
    username: string;
    name: string;
    email: string;
    sex: "male" | "female";
    role: string;
};

export type AuthContextValue = {
    auth: User & { accessToken: string };
    setAuth: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextValue | {}>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
