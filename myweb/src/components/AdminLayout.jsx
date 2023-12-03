import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    else if(user.mode === "admin"){
        return (
            <div>
                <Outlet />
            </div>
        )
    }
};