import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <>
      <li className="">
        <NavLink to="/service">Service</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/be-a-rider">Be A Rider</NavLink>
      </li>
    </>
  );
};

export default Navigation;
