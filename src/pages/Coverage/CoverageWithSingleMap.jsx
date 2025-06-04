import { useLoaderData } from "react-router";
import PageTitle from "../../components/PageTitle";
import { useState } from "react";
const CoverageWithSingleMap = () => {
  const warehouses = useLoaderData();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleMap = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);
  };
  return (
    <div className="container">
      <PageTitle
        title={"Our Coverage"}
        subtitle={"We provide Service across each of the part of bangladesh"}
      ></PageTitle>

      <section className="flex flex-col gap-5">
        <div className="nav flex flex-wrap gap-3">
          {warehouses.map((wh) => (
            <button
              onClick={() => handleMap(wh.latitude, wh.longitude)}
              className="btn btn-sm btn-outline text-black btn-primary"
            >
              {wh.district}
            </button>
          ))}
        </div>
        <div className="nav  flex-1 mb-10">
          <iframe
            width="100%"
            height={"450"}
            className="border-0 rounded-2xl"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=12&output=embed`}
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default CoverageWithSingleMap;
