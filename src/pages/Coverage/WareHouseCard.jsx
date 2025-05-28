import { BiWorld } from "react-icons/bi";
import { FaPlane } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";

const WareHouseCard = ({ data }) => {
  const { region, district, covered_area, longitude, latitude } = data;
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure className="flex-1">
        <iframe
          width="600"
          className="border-0"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=12&output=embed`}
        ></iframe>
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title">{district}</h2>
        <p className="flex items-center gap-3 ">
          <BiWorld></BiWorld> - <span className="font-bold">{region}</span>{" "}
        </p>

        <p className="font-bold text-secondary">Area Covered</p>
        <div className="flex gap-3 flex-wrap">
          {covered_area.map((area) => (
            <div key={area} className="badge badge-neutral">
              {area}
            </div>
          ))}
        </div>
        <div className="card-actions">
          <button className="btn btn-sm btn-primary text-black">
            Send Percel <FaRegPaperPlane></FaRegPaperPlane>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WareHouseCard;
