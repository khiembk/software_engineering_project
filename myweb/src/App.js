import { defer, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AdminLayout } from './components/AdminLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { UnprotectedLayout } from './components/UnprotectedLayout';
import { AuthLayout } from "./components/AuthLayout";
import Login from './pages/Login';
import Home from './pages/Home';
import UserInformation from "./pages/UserInformation";
import FeePay from './pages/FeePay'
import FeeHistory from './pages/PayHistory'
import Statistic from "./pages/Statistic";
import AdminHomePage from "./pages/AdminHomePage";
import CreateFee from "./pages/CreateFee";
import CreateUser from "./pages/CreateUser";
import CreateFamily from "./pages/CreateFamily"

const getUserData = () => 
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 3000)
);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout/>} loader={() => defer({ userPromise: getUserData() })}>
            <Route element={<UnprotectedLayout/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>
            <Route element={<ProtectedLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/thongtin" element={<UserInformation/>}/>
                <Route path="/thuphi" element={<FeePay/>}/>
                <Route path="/lichsunop" element={<FeeHistory/>}/>
                <Route path="/thongke" element={<Statistic/>}/>
            </Route>
            <Route element={<AdminLayout/>}>
                <Route path="/admin/" element={<AdminHomePage/>}/>
                <Route path="/admin/addfee" element={<CreateFee/>}/>
                <Route path="/admin/adduser" element={<CreateUser/>}/>
                <Route path="/admin/addfamily" element={<CreateFamily/>}/>
            </Route>
        </Route>
    )
);