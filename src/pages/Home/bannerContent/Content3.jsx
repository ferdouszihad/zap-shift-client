import { MdArrowOutward } from "react-icons/md";
import tdelivery from "../../../assets/tiny-deliveryman.png";
import bdelivery from "../../../assets/big-deliveryman.png";
const Content3 = () => {
  return (
    <div className="flex justify-between items-center gap-10 p-10">
      <div className="flex-1 space-y-5">
        <img className="w-[150px]" src={tdelivery} alt="" />
        <h1 className="text-5xl font-black">
          We Make Sure <br />{" "}
          <span className="text-[#33929D]">Your Parcel</span> Arrives On Time{" "}
          <br /> – No Fuss.
        </h1>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="flex gap-5 items-center">
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
      <div className="">
        <img className="max-w-[450px]" src={bdelivery} alt="" />
      </div>
    </div>
  );
};

export default Content3;
