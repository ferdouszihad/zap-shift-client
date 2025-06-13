import { MdArrowOutward } from "react-icons/md";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Header = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    Swal.fire({
      title: "We will Miss You Sir",
      text: "Let's Increase your Business Journey with us",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#caeb66",
      cancelButtonText: "I will stay",
      confirmButtonText: "LogOut",
      buttonsStyling: { color: "black" },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl glass">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-80 p-2 shadow *:py-2 *:border-b *:border-secondary"
          >
            <Navigation></Navigation>
          </ul>
        </div>
        <div className="">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <Navigation></Navigation>
        </ul>
      </div>
      {user && user?.email ? (
        <div className="navbar-end gap-3">
          <div className="dropdown dropdown-end" style={{ zIndex: 1000 }}>
            <div
              tabIndex={0}
              role="button"
              className="rounded-full cursor-pointer relative z-10 overflow-hidden border-2 border-primary p-px"
            >
              <img
                className="w-12 h-12 object-fit rounded-full relative z-10 "
                src={user?.photoURL}
                alt="as"
              />
              <h2 className="inset-0 absolute flex justify-center items-center text-xl font-bold bg-primary">
                {user?.email[0]}
              </h2>
            </div>

            <ul
              tabIndex={0}
              id="user-nav"
              className="dropdown-content -right-1  !z-[999] menu bg-base-100 rounded-box  w-60 p-2 shadow-sm *:py-3 border-b-2 border-b-base-300"
              style={{ zIndex: 1000 }}
            >
              <li className="border-b-2 border-b-base-300">
                <Link to="/book-parcel">Book a Parcel</Link>
              </li>
              <li className="border-b-2 border-b-base-300">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="border-b-2 border-b-base-300">
                <Link to={"/tracking"}>Track Parcel</Link>
              </li>
              <li className="">
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary text-info "
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-3">
          <Link
            to="/login"
            className=" hidden md:flex btn btn-ghost border-[#DADADA]"
          >
            Sign In
          </Link>
          <Link to="/tracking" className="">
            <button className="btn btn-primary text-info">Track Parcel</button>

            <button className="btn btn-info text-base-100 btn-circle ">
              <MdArrowOutward size={30} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
