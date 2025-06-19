import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Forbidden from "../pages/utils/Forbidden";
import Loading from "../pages/utils/Loading";

import { Link } from "react-router";

const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  console.log(role, user);
  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (user && role == "agent") {
    return children;
  }
  return <Forbidden></Forbidden>;
};

export default AgentRoute;
