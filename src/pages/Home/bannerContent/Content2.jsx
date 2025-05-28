import { MdArrowOutward } from "react-icons/md";
import tdelivery from "../../../assets/tiny-deliveryman.png";
import bdelivery from "../../../assets/big-deliveryman.png";
const Content2 = () => {
  return (
    <div className="flex flex-col-reverse  lg:flex-row-reverse justify-between items-center gap-20 p-10 z-[-5000]">
      <div className="flex-1 space-y-5 text-center lg:text-left">
        <img className="w-[150px] mx-auto" src={tdelivery} alt="" />
        <h1 className="md:text-5xl text-3xl font-black">
          No Delays. No Worries.. <br />{" "}
          <span className="text-[#33929D]"> Just Fast Delivery</span> <br /> We
          Make Sure
        </h1>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
          <div className="">
            <button className="btn btn-primary text-info">
              Track Your Parcel
            </button>

            <button className="btn btn-info text-base-100 btn-circle ">
              <MdArrowOutward size={30} />
            </button>
          </div>
          <button className="btn btn-ghost border-[#DADADA]">Be a Rider</button>
        </div>
      </div>
      <div className="flex-1">
        <img className="" src={bdelivery} alt="" />
      </div>
    </div>
  );
};

export default Content2;
