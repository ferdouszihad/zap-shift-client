import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Home from "../pages/Home/Home";
import Error404 from "../pages/utils/Error404";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivacyPolicy from "../pages/utils/PrivacyPolicy";
import TermsAndConditions from "../pages/utils/TermsAndConditions";
import Loading from "../pages/utils/Loading";
import BookParcel from "../pages/BookParcel/BookParcel";
import ServicePage from "../pages/Services/ServicePage";
import Coverage from "../pages/Coverage/Coverage";
import Pricing from "../pages/Pricing/Pricing";
import AboutUs from "../pages/AboutUs/AboutUs";

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
        path: "/book-parcel",
        element: <BookParcel></BookParcel>,
      },
      {
        path: "/service",
        element: <ServicePage></ServicePage>,
      },
      {
        path: "/be-a-rider",
        element: <ServicePage></ServicePage>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("https://zap-shift-server.vercel.app/warehouse"),
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
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
