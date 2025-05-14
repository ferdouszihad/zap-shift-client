import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/utils/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading></Loading>;

  if (user && user?.email) return children;

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
