import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const currentPage = window.location.pathname.split("/")[1];

    const logoutBtn_Click = async e => {
        e.preventDefault();
        logout();
    }
    const redirectBtn_Click = async (e, page) => {
        e.preventDefault(); 
        if(currentPage !== page){
            navigate("/" + page);
        }
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    else if(user.mode === "user"){
        return (
            <div>
                <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button className={`home-button ${currentPage === "" && "bg-blue-500 text-white"} `} style={{margin: '10px'}} onClick={(e) => redirectBtn_Click(e, "")}>Home</button>
                        <button className={`home-button ${currentPage === "thongtin" && "bg-blue-500 text-white"} `} style={{margin: '10px'}} onClick={(e) => redirectBtn_Click(e, "thongtin")}>Thông tin</button>
                        <button className={`home-button ${currentPage === "thuphi" && "bg-blue-500 text-white"} `} style={{margin: '10px'}} onClick={(e) => redirectBtn_Click(e, "thuphi")}>Thu phí</button>
                        <button className={`home-button ${currentPage === "lichsunop" && "bg-blue-500 text-white"} `} style={{margin: '10px'}} onClick={(e) => redirectBtn_Click(e, "lichsunop")}>Lịch sử nộp phí</button>
                        <button className={`home-button ${currentPage === "thongke" && "bg-blue-500 text-white"} `} style={{margin: '10px'}} onClick={(e) => redirectBtn_Click(e, "thongke")}>Thống kê</button>
                    </div>
                    <button class="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded justify-end" style={{margin: '10px'}} onClick={logoutBtn_Click}>Logout</button>
                </nav>
                <Outlet />
            </div>
        )
    }
    else if(user.mode === "admin"){
        return <Navigate to="/admin/" />;
    }
};