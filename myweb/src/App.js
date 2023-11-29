import { defer, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ProtectedLayout } from './components/ProtectedLayout';
import { UnprotectedLayout } from './components/UnprotectedLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthLayout } from "./components/AuthLayout";

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
            </Route>
        </Route>
    )
);