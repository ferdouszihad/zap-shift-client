import { FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from "../../../components/PageTitle";
import useUserParcel from "../../../hooks/useUserParcel";
import Loading from "../../utils/Loading";

import TrackParcelRow from "./TrackParcelRow";

const TrackParcel = () => {
  const { parcels, isLoading } = useUserParcel();
  const parcelStatus = [
    "unpaid",
    "paid",
    "ready for pickup",
    "in transit",
    "out for delivery",
    "delivered",
  ];

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="content-box pt-5">
      <PageTitle
        title={"Track Your Parcels"}
        subtitle={
          "Track your parcel 24/7.Our team is safely delivering your parcels"
        }
      ></PageTitle>

      <p className=" border-l-4 border-secondary pl-4">
        Total <span>{parcels.length}</span> Parcels Found
      </p>
      <div className=" flex flex-wrap gap-5 justify-center items-center my-5">
        {parcelStatus.map((status, index) => (
          <div
            key={index}
            className="flex items-center gap-2 lg:text-lg font-semibold bg-secondary text-base-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-all duration-300"
          >
            <span className="">{status}</span>
            <span className="text-base-100 font-bold">
              {parcels.filter((parcel) => parcel.status === status).length}
            </span>
          </div>
        ))}
      </div>
      <form className="flex gap-2  mt-3 relative pb-10 border-b-2 border-stone-200">
        <input
          name="search"
          className="input input-bordered bg-base-300 w-full max-w-2xl rounded-full pl-8"
          type="text"
          placeholder="Search Parcel with Receivers Phone Number or Tracking Code"
        />
        <FaMagnifyingGlass className="absolute top-3 left-2"></FaMagnifyingGlass>

        <button
          className="btn btn-primary px-10 text-black rounded-full relative right-[50px] z-10"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto pt-5 rounded-box border border-base-content/5 bg-base-100">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Info</th>
              <th>Recivier Info</th>
              <th>Tracking No.</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <TrackParcelRow
                key={parcel._id}
                index={index + 1}
                parcel={parcel}
              ></TrackParcelRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackParcel;
