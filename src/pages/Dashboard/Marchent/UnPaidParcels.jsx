import { Link } from "react-router";
import PageTitle from "../../../components/PageTitle";
import useUnPaidParcel from "../../../hooks/useUnPaidPercels";
import ParcelRow from "./ParcelRow";
import Loading from "../../utils/Loading";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UnPaidParcels = () => {
  const { parcels, isLoading, refetch } = useUnPaidParcel();
  const [total, setTotal] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const sum = parcels
      .filter((p) => (p.status = "unpaid"))
      .reduce((acc, p) => acc + p.charge, 0);
    setTotal(sum);
  }, [parcels]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcel/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Oppsl!",
            text: "Could Not Delete The Parcel",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="container">
      <PageTitle
        title={"Parcels To Paid"}
        subtitle={
          "please complete your payment for parcel to start delivery procedure"
        }
      ></PageTitle>

      {parcels.length == 0 && (
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
                  handleDelete={handleDelete}
                ></ParcelRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnPaidParcels;
