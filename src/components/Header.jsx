import { MdArrowOutward } from "react-icons/md";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
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
          <button onClick={logOut} className="btn btn-primary text-info ">
            LogOut
          </button>
        </div>
      ) : (
        <div className="navbar-end gap-3">
          <Link to="/login" className="btn btn-ghost border-[#DADADA]">
            Sign In
          </Link>
          <Link to="/register" className="">
            <button className="btn btn-primary text-info">Sign Up</button>

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
