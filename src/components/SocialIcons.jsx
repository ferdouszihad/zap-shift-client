import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn, FaFacebook, FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const SocialIcons = () => {
  return (
    <div className="flex justify-center gap-5 ">
      <a
        href=""
        target="_blank"
        className="bg-blue-500 btn btn-circle border-none"
      >
        <FaLinkedinIn className="text-white" size={18}></FaLinkedinIn>
      </a>
      <a
        href=""
        target="_blank"
        className="bg-white btn btn-circle border-none"
      >
        <BsTwitterX size={18} className="text-"></BsTwitterX>
      </a>
      <a
        href=""
        target="_blank"
        className="bg-blue-500 btn btn-circle border-none overflow-hidden"
      >
        <FaFacebookF
          size={30}
          className="text-white relative -bottom-1 "
        ></FaFacebookF>
      </a>
      <a
        href=""
        target="_blank"
        className="bg-red-500 btn btn-circle border-none"
      >
        <FaYoutube size={18} className="text-white "></FaYoutube>
      </a>
    </div>
  );
};

export default SocialIcons;
