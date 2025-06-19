import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import ManageParcelRow from "./ManageParcelRow";

const ManageParcel = () => {
  const axiosSecure = useAxiosSecure();
  const parcelStatus = [
    "unpaid",
    "paid",
    "ready-to-pickup",
    "in-transit",
    "reached-wareHouse",
    "shipped",
    "ready-for-delivery",
    "delivered",
  ];

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure("/parcel/all");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="content-box bg base-100 p-10 my-5">
      <PageTitle
        title={"Manage Parcels"}
        subtitle={
          "Manage All Parcels in the SYstem to provide seemless delivery"
        }
      ></PageTitle>

      <p className="text-lg text-secondary">
        Total <span className="font-bold">{parcels.length}</span> Parcels Found
      </p>
      <div className="flex flex-wrap gap-5  my-5">
        {parcelStatus.map((status, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm  font-semibold bg-secondary text-base-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-all duration-300"
          >
            <span className="">{status}</span>
            <span className="text-base-100 font-bold">
              {parcels.filter((parcel) => parcel.status === status).length}
            </span>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full mt-6">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <ManageParcelRow
                key={parcel._id}
                parcel={parcel}
                refetch={refetch}
              ></ManageParcelRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageParcel;
