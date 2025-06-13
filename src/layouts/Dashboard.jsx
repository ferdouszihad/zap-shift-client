import { CgAdd, CgFormatColor, CgTrack } from "react-icons/cg";
import { FaBars, FaGear } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate, useNavigation } from "react-router";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";

import { MdReviews, MdTrackChanges } from "react-icons/md";
import { FaJediOrder, FaMoneyBill } from "react-icons/fa";
import { HiComputerDesktop, HiHome } from "react-icons/hi2";
import { GrDeliver, GrGrid } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import Loading from "../pages/utils/Loading";
import useUnPaidParcel from "../hooks/useUnPaidPercels";
import useUserRole from "../hooks/useUserRole";
import { BsHouseFill } from "react-icons/bs";

const Dashboard = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { state } = useNavigation();
  const { parcels } = useUnPaidParcel("unpaid");
  const { role } = useUserRole();
  console.log(parcels);

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };
  const nav = (
    <>
      <li>
        <NavLink to="/dashboard">
          <HiHome></HiHome> {role.toUpperCase()} Home
        </NavLink>
        {role == "merchant" && (
          <>
            <NavLink to="add-parcel">
              <CgAdd></CgAdd> Add a Parcel
            </NavLink>
            <NavLink to="/dashboard/parcels/unpaid">
              <MdTrackChanges></MdTrackChanges> Parcel To Pay
              <div className="badge badge-sm badge-secondary">
                {parcels.length}
              </div>
            </NavLink>

            <NavLink to="/dashboard/track-parcel">
              <CgTrack></CgTrack> Track Parcels
            </NavLink>

            <NavLink to="payment-history">
              <FaMoneyBill></FaMoneyBill> Payment History
            </NavLink>
            <NavLink to="manage-products">
              <MdReviews></MdReviews> Manage Reviews
            </NavLink>
          </>
        )}
        {role == "admin" && (
          <>
            <NavLink to="manage-user">
              <BiUserCircle></BiUserCircle> Manage User
            </NavLink>
            <NavLink to="manage-parcels">
              <MdReviews></MdReviews> Manage Parcels
            </NavLink>

            <NavLink to="manage-agents">
              <GrDeliver></GrDeliver> Manage Agents
            </NavLink>
            <NavLink to="agent-requests">
              <GrDeliver></GrDeliver> Agent Requests
            </NavLink>

            <NavLink to="manage-warehouse">
              <BsHouseFill></BsHouseFill> Manage WareHouse
            </NavLink>

            <NavLink to="all-payments">
              <FaMoneyBill></FaMoneyBill> All Payments
            </NavLink>
          </>
        )}
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <div className="">
          <nav className="px-5 py-5 bg-base-200 flex justify-between items-center lg:hidden">
            <Logo></Logo>
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden cursor-pointer "
            >
              <FaBars className="text-3xl"></FaBars>
            </label>
          </nav>
          <main className="">
            {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
          </main>
        </div>
      </div>
      {/* on large device  */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu glass bg-base-200 text-base-content min-h-full w-60 px-4 space-y-3">
          {/* Sidebar content here */}
          <div className="pt-5">
            <Logo></Logo>
            <div className="divider"></div>
          </div>
          <div className="*:space-y-5">{nav}</div>
          <div className="divider"></div>
          <li className="">
            <NavLink to="/dashboard/me">
              <FaGear></FaGear>User Setting
            </NavLink>
          </li>
          <li className="" onClick={handleLogOut}>
            <span>
              <BiLogOutCircle></BiLogOutCircle>Log-Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
