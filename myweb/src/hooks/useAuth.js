import { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "./useLogalStorage";
import { useNavigate } from "react-router-dom";
const AuthenContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        navigate("/");
    };

    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true});
    };

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user]
    );

    return <AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthenContext);
};