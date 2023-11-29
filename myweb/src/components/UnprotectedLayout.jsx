import { Navigate, Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const UnprotectedLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};