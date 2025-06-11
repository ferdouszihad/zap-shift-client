import { Link } from "react-router";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <div
      data-aos="fade-in"
      data-aos-duration="1500"
      className="container bg-black rounded-xl py-10"
    >
      <div className="flex justify-center flex-col items-center gap-10 text-center">
        <Logo dark={true}></Logo>

        <div className="lg:w-6/12 mx-auto">
          <p className="text-base-200 text-sm">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
        <ul className="flex lg:flex-row flex-col gap-5 text-base-200 *:*:px-2">
          <Navigation></Navigation>
        </ul>
        <div className="">
          <SocialIcons></SocialIcons>
        </div>
        <div className="text-accent *:hover:text-base-300 *:hover:underline space-x-5 text-sm text-link">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Condition</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
