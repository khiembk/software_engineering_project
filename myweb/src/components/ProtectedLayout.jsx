import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logoutBtn_Click = async e => {
        e.preventDefault();
        logout();
    }
    const redirectBtn_Click = async (e, page) => {
        e.preventDefault();
        navigate("/" + page);
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <nav style={{ display: 'flex', marginTop: '10px', marginLeft: '10px', marginRight: '10px', justifyContent: 'space-between' }}>
                <div>
                    <button className="home-button" style={{marginRight: '5px'}} onClick={(e) => redirectBtn_Click(e, "")}>Home</button>
                    <button className="home-button" style={{marginRight: '5px'}} onClick={(e) => redirectBtn_Click(e, "thongtin")}>Thông tin</button>
                    <button className="home-button" style={{marginRight: '5px'}} onClick={(e) => redirectBtn_Click(e, "thuphi")}>Thu phí</button>
                    <button className="home-button" style={{marginRight: '5px'}} onClick={(e) => redirectBtn_Click(e, "lichsunop")}>Lịch sử nộp phí</button>
                    <button className="home-button" style={{marginRight: '5px'}} onClick={(e) => redirectBtn_Click(e, "thongke")}>Thống kê</button>
                </div>
                <button class="bg-transparent hover:bg-red-300 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded justify-end" onClick={logoutBtn_Click}>Logout</button>
            </nav>
            <Outlet />
        </div>
    )
};