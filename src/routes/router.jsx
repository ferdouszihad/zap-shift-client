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
import PrivateRoute from "./PrivateRoute";
import RiderRegistraion from "../pages/BeARider/RiderRegistraion";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/Shared/DashboardHome";
import UnPaidParcels from "../pages/Dashboard/Marchent/UnPaidParcels";
import Payment from "../pages/Dashboard/Marchent/Payment/Payment";
import TrackParcel from "../pages/Dashboard/Marchent/TrackParcel";
import ParcelDetail from "../pages/Dashboard/Shared/ParcelDetail";
import Trackinng from "../pages/Tracking/Trackinng";

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
        element: (
          <PrivateRoute>
            <BookParcel></BookParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/division.json"),
      },
      {
        path: "/service",
        element: <ServicePage></ServicePage>,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <RiderRegistraion></RiderRegistraion>
          </PrivateRoute>
        ),
        loader: () => fetch("/division.json"),
      },

      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch(`${import.meta.env.VITE_SERVER}/warehouse`),
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/tracking",
        element: <Trackinng></Trackinng>,
      },
      {
        path: "/tracking/:id",
        element: <Trackinng></Trackinng>,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/Add-Parcel",
        element: <BookParcel></BookParcel>,
        loader: () => fetch("/division.json"),
      },
      {
        path: "/dashboard/parcels/unpaid",
        element: <UnPaidParcels></UnPaidParcels>,
      },
      {
        path: "/dashboard/parcel/:id",
        element: <ParcelDetail></ParcelDetail>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/track-parcel",
        element: <TrackParcel></TrackParcel>,
      },
    ],
  },
]);

export default router;
