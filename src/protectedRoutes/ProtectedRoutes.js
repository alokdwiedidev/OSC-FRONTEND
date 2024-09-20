import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const isLoggedIn = userData?.sessionId && userData?.fullName
    return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
    // return <Outlet />
}

export default ProtectedRoutes