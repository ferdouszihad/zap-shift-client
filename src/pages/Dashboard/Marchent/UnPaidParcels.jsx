import { Link } from "react-router";
import PageTitle from "../../../components/PageTitle";
import useUserParcel from "../../../hooks/useUserParcel";
import ParcelRow from "./ParcelRow";
import Loading from "../../utils/Loading";
import { useEffect, useState } from "react";

const UnPaidParcels = () => {
  const { parcels, isLoading } = useUserParcel();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = parcels.reduce((acc, p) => acc + p.charge, 0);
    setTotal(sum);
  }, [parcels]);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="container">
      <PageTitle
        title={"Parcels To Paid"}
        subtitle={
          "please complete your payment for parcel to start delivery procedure"
        }
      ></PageTitle>

      {parcels?.length == 0 && (
        <div className="py-10 flex flex-col justify-center gap-5 items-center">
          <h2 className="text-center text-3xl">
            You have not Booked any parcel yet
          </h2>
          <Link to="/dashboard/add-parcel" className="btn btn-secondary">
            Add a Parcel
          </Link>
        </div>
      )}

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <p className=" flex gap-2 justify-end items-center">
          Total to Pay -{" "}
          <span className="font-bold text-secondary">{total}৳</span>{" "}
          <Link to="/dashboard/payment" className="btn btn-primary text-black">
            Pay All
          </Link>
        </p>
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel</th>
              <th>Type</th>
              <th>Recivier Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels
              .filter((parcel) => parcel.status == "unpaid")
              ?.map((parcel, index) => (
                <ParcelRow
                  key={parcel._id}
                  index={index + 1}
                  parcel={parcel}
                ></ParcelRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnPaidParcels;
