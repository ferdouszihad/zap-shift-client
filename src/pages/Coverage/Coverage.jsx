import { useLoaderData } from "react-router";
import PageTitle from "../../components/PageTitle";
import WareHouseCard from "./WareHouseCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Coverage = () => {
  const [warehouses] = useState(useLoaderData());

  const [selectedWareHouse, setSelectedWareHouse] = useState(warehouses[0]);
  console.log(warehouses);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.toLowerCase();
    const selected = warehouses.find(
      (area) =>
        area.city?.toLowerCase().includes(searchValue) ||
        area.covered_area.join(" , ").toLowerCase().includes(searchValue)
    );
    if (!selected) {
      Swal.fire("Opps", "We are Not available in that area", "error");
    }
    if (selected) {
      setSelectedWareHouse(selected);
    }
  };
  console.log(selectedWareHouse);

  return (
    <div className="content-box bg-base-100 my-5 p-10 rounded-2xl">
      <PageTitle
        title={"We are available in 64 districts"}
        subtitle={"We provide Service across each of the part of bangladesh"}
      ></PageTitle>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 relative pb-10 border-b-2 border-stone-200"
      >
        <input
          name="search"
          list="areas"
          className="input input-bordered bg-base-300 w-full max-w-lg rounded-full pl-8"
          type="text"
        />
        <datalist id="areas">
          {warehouses.map((wh, index) => (
            <React.Fragment key={index}>
              <option value={wh.city} />
              {wh.covered_area.map((area, idx) => (
                <option key={`${index}-${idx}`} value={area} />
              ))}
            </React.Fragment>
          ))}
        </datalist>

        <FaMagnifyingGlass className="absolute top-3 left-2"></FaMagnifyingGlass>

        <button
          className="btn btn-primary px-10 text-black rounded-full relative right-[50px] z-10"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="">
        <figure className="lg:flex-1">
          <iframe
            width="100%"
            className="border-0 rounded-2xl"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${selectedWareHouse.latitude},${selectedWareHouse.longitude}&hl=en&z=12&output=embed`}
          ></iframe>
        </figure>
      </div>
    </div>
  );
};

export default Coverage;
