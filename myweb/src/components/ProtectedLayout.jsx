import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
            <div className="h-screen">
                <h1 className="flex w-full h-[6%] bg-blue-600 border-b-[1px] border-gray-300" style={{justifyContent: 'right', position: 'fixed'}}>
                    <button className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-4 border rounded-[2rem]">
                        <div className="flex">
                            <NotificationsIcon/>
                        </div>
                    </button>

                    <button className='px-4 py-2 bg-red-500 border rounded-[2rem] font-semibold text-white hover:bg-red-800' onClick={e => {navigate("/changepass")}}>
                        <div className="flex">
                            <PasswordIcon/>
                        </div>
                    </button>

                    <button className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-4 border rounded-[2rem]" onClick={logoutBtn_Click}>
                        <div className="flex">
                            <LogoutIcon/>
                        </div>
                    </button>
                </h1>
                <div className="flex h-screen" style={{paddingTop: '50px'}}>
                    <div className="bg-blue-500" style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}} >
                        <button className={`home-button ${currentPage === "" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "")}>
                            <div className="flex">
                                <HomeIcon className="justify-start" fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Home</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thongtin" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thongtin")}>
                            <div className="flex">
                                <PermIdentityIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thông tin</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thuphi" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thuphi")}>
                            <div className="flex">
                                <ReceiptIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thu phí</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "lichsunop" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "lichsunop")}>
                            <div className="flex">
                                <HistoryIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Lịch sử nộp phí</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thongke" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thongke")}>
                            <div className="flex">
                                <AnalyticsIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thống kê</p>
                            </div>
                        </button>
                    </div>
                    <Outlet/>
                </div>
            </div>
        )
    }
    else if(user.mode === "admin"){
        return <Navigate to="/admin/" />;
    }
};