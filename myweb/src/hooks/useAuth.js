import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthenContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useLocalStorage("user", { data: null, timestamp: null });
    const navigate = useNavigate();

    const login = async (data) => {
        const timestamp = new Date().getTime() + 60 * 60 * 1000; // 60 minutes session
        setUserData({ data, timestamp });
        navigate("/");
    };

    const logout = () => {
        setUserData({ data: null, timestamp: null });
        navigate("/login", { replace: true });
    };

    const isSessionValid = useMemo(() => {
        if (!userData || !userData.timestamp) {
            return false;
        }
        const currentTime = new Date().getTime();
        return currentTime < userData.timestamp;
    }, [userData]);

    const value = useMemo(
        () => ({
            user: isSessionValid ? userData.data : null,
            login,
            logout,
            isSessionValid,
        }),
        [isSessionValid, login, logout, userData.data]
    );

    return <AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthenContext);
};
