import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <>
      <li className="">
        <NavLink className={"navlink"} to="/service">
          Service
        </NavLink>
      </li>
      <li>
        <NavLink className={"navlink"} to="/coverage">
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink className={"navlink"} to="/about-us">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink className={"navlink"} to="/pricing">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink className={"navlink"} to="/be-a-rider">
          Be A Rider
        </NavLink>
      </li>
    </>
  );
};

export default Navigation;
