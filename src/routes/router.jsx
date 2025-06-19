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
import AuthLayouts from "../layouts/AuthLayouts";
import ForgetPass from "../pages/Authentication/ForgetPass";
import PaymentHistory from "../pages/Dashboard/Marchent/PaymentHistory";
import AdminRoute from "./AdminRoute";

import MarchentRoute from "./MarchentRoute";
import Forbidden from "../pages/utils/Forbidden";
import AgentRequest from "../pages/Dashboard/Admin/AgentRequest";
import ManageAgent from "../pages/Dashboard/Admin/ManageAgent";
import ManageParcel from "../pages/Dashboard/Admin/ManageParcel";
import ManageSingleParcel from "../pages/Dashboard/Admin/ManageSingleParcel";
import AgentRoute from "./AgentRoute";
import PickUp from "../pages/Dashboard/Agent/PickUp";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";

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
            <MarchentRoute>
              <BookParcel></BookParcel>
            </MarchentRoute>
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
    path: "",
    element: <AuthLayouts></AuthLayouts>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forget-password",
        element: <ForgetPass></ForgetPass>,
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
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/Add-Parcel",
        element: (
          <MarchentRoute>
            <BookParcel></BookParcel>
          </MarchentRoute>
        ),
        loader: () => fetch("/division.json"),
      },
      {
        path: "/dashboard/parcels/unpaid",
        element: (
          <MarchentRoute>
            <UnPaidParcels></UnPaidParcels>
          </MarchentRoute>
        ),
      },
      {
        path: "/dashboard/parcel/:id",
        element: <ParcelDetail></ParcelDetail>,
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <MarchentRoute>
            <Payment></Payment>
          </MarchentRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <MarchentRoute>
            <PaymentHistory></PaymentHistory>
          </MarchentRoute>
        ),
      },
      {
        path: "/dashboard/track-parcel",
        element: (
          <MarchentRoute>
            <TrackParcel></TrackParcel>
          </MarchentRoute>
        ),
      },
      {
        path: "/dashboard/manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-agents",
        element: (
          <AdminRoute>
            <ManageAgent></ManageAgent>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-parcels",
        element: (
          <AdminRoute>
            <ManageParcel></ManageParcel>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-parcels/:id",
        element: (
          <AdminRoute>
            <ManageSingleParcel></ManageSingleParcel>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/agent-requests",
        element: (
          <AdminRoute>
            <AgentRequest></AgentRequest>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/pickup",
        element: (
          <AgentRoute>
            <PickUp></PickUp>
          </AgentRoute>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    element: <Forbidden></Forbidden>,
  },
]);

export default router;
