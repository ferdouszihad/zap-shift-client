import { FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from "../../../components/PageTitle";
import useUserParcel from "../../../hooks/useUserParcel";
import Loading from "../../utils/Loading";

import TrackParcelRow from "./TrackParcelRow";

const TrackParcel = () => {
  const { parcels, isLoading } = useUserParcel();
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
