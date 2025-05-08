import { Link } from "react-router";
import logo from "../assets/logo.png";
const Logo = ({ dark = false }) => {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 text-2xl font-bold text-info ${
        dark && "text-white"
      }`}
    >
      <img className="w-8 relative left-5 bottom-2" src={logo} alt="" />
      <h2 className="hidden lg:block">ZapShift</h2>
      <h2 className="lg:hidden">ZShift</h2>
    </Link>
  );
};

export default Logo;
