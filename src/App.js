import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Dashboard from "./Pages/DashBoard";
import { useEffect, } from "react";
import DashboardHeader from "./components/DashboardHeader";
import ProductDetails from "./Pages/ProductDetails";
import Category from "./Pages/Category";
import { useSelector, useDispatch } from "react-redux";
import { handleIsLoggedIn } from "./redux/dashboardSlice";


function App() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { isLoggedIn } = useSelector((state) => state.dashboardSlice);
  useEffect(() => {
    if (userData?.userId && userData?.sessionId) {
      dispatch(handleIsLoggedIn(true));
    }
  }, [userData]);

  return (
    <div className="App">
      {isLoggedIn ? <DashboardHeader /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:catId" element={<Category />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
