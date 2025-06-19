import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
   const { accessToken, tokenExpiry } = useSelector((state) => state.user);
   const isTokenValid = () => {
    if (!accessToken || !tokenExpiry) return false;
    const now = new Date().getTime();
    const expiryTime = new Date(tokenExpiry).getTime();
    return now < expiryTime;
  };

  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;