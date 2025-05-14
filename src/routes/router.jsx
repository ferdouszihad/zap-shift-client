import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Home from "../pages/Home/Home";
import Error404 from "../pages/utils/Error404";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivacyPolicy from "../pages/utils/PrivacyPolicy";
import TermsAndConditions from "../pages/utils/TermsAndConditions";
import Loading from "../pages/utils/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404></Error404>,
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions></TermsAndConditions>,
      },
    ],
  },
]);

export default router;
