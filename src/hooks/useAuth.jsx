import { use } from "react";
import { AuthContext } from "../provider/context";

const useAuth = () => {
  const data = use(AuthContext);

  return data;
};

export default useAuth;
