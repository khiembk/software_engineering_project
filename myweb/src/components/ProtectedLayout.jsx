import { Navigate, Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <nav>
                <Link to="/">Settings</Link>
            </nav>
            <Outlet />
        </div>
    )
};