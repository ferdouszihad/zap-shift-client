import Logo from "./Logo";
import Navigation from "./Navigation";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <div className="container bg-black rounded-xl py-10">
      <div className="flex justify-center flex-col items-center gap-10 text-center">
        <Logo dark={true}></Logo>

        <div className="lg:w-6/12 mx-auto">
          <p className="text-base-200 text-sm">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
        <ul className="flex gap-5 text-base-200">
          <Navigation></Navigation>
        </ul>
        <div className="">
          <SocialIcons></SocialIcons>
        </div>
      </div>
    </div>
  );
};

export default Footer;
