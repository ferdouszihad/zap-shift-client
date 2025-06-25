import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../utils/Loading";
import PageTitle from "../../../components/PageTitle";
import { format } from "date-fns";
import useWareHouseData from "../../../hooks/useWareHouseData";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaLocationArrow,
} from "react-icons/fa";
import PickUpAssignModal from "./PickUpAssignModal";
import Swal from "sweetalert2";
import DeliveryAssignModal from "./DeliveryAssignModal";

const ManageSingleParcel = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { warehouses } = useWareHouseData();

  const {
    data: parcel = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["details", user?.email, id],
    queryFn: async () => {
      const res1 = await axiosSecure.get(`/parcel/details/${id}`);
      const res2 = await axiosSecure.get(`/tracking/${res1.data.tracking_no}`);
      return res2.data;
    },
  });

  console.log(parcel);

  const {
    _id,
    type,
    title,
    weight,
    charge,
    deliveryWareHouse,
    pickupWarehouse,
    pickupInstruction,
    deliveryInstruction,
    senderName,
    senderPhone,
    senderEmail,
    senderAddress,
    senderRegion,
    receiverName,
    receiverPhone,
    receiverAddress,
    recieverRegion,
    tracking_no,
    pickup_otp,
    delivery_otp,
    status,
    created_at,
  } = parcel.parcelInfo || {};

  const handleParcelStatus = (status, statusMessage) => {
    axiosSecure
      .put(`/parcel/update-status/${_id}`, {
        status,
        statusMessage,
        updatedBy: user?.displayName,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Parcel received successfully!", "success");
          refetch();
        } else {
          Swal.fire(
            "Error",
            "Failed to receive parcel. Please try again.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error receiving parcel:", error);
        Swal.fire(
          "Error",
          "An error occurred while receiving the parcel.",
          "error"
        );
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <PageTitle
        title="Manage Delivery"
        subtitle={`Parcel created at ${format(new Date(created_at), "PPPpp")}`}
      />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <h2 className="text-lg font-bold">
            Parcel ID : <span className="text-secondary">{_id}</span>
          </h2>
          <div className="grid grid-cols-2 gap-5 pt-4">
            <div className="shadow p-5 space-y-4">
              <p>From</p>
              <h2 className="text-lg font-bold">
                <FaLocationArrow className="inline mr-5"></FaLocationArrow>
                {warehouses.find((wh) => wh._id == pickupWarehouse).city}
              </h2>
            </div>
            <div className="shadow p-5 space-y-4">
              <p>To</p>
              <h2 className="text-lg font-bold">
                <FaLocationArrow className="inline mr-5"></FaLocationArrow>
                {warehouses.find((wh) => wh._id == deliveryWareHouse).city}
              </h2>
            </div>
          </div>
          <h2 className="my-5 font-bold text-lg">Delivery Timeline</h2>
          <ul className="timeline timeline-vertical">
            {parcel?.history?.map((item, index) => (
              <li key={item._id}>
                {index !== 0 && <hr className="bg-primary" />}
                <div
                  className={
                    index % 2 === 0
                      ? "timeline-start timeline-box w-full"
                      : "timeline-end timeline-box w-full"
                  }
                >
                  <p className="font-bold">{item.status}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(item.updatedAt), "PPpp")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Updated by: {item.updatedBy}
                  </p>
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-primary h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <hr className="bg-primary" />
              </li>
            ))}
          </ul>

          <div className="action mt-5 space-y-5">
            <h2 className="text-2xl font-bold mb-5">Take Action</h2>
            <ol type="1" className="list border-l-4 border-primary">
              <li className="list-row">
                <label
                  disabled={status != "paid"}
                  className="btn btn-primary"
                  htmlFor="assign_modal"
                >
                  Assign Agent For Pick Up
                </label>
                <PickUpAssignModal
                  parcelId={_id}
                  refetch={refetch}
                  wareHouse={warehouses.find((wh) => wh._id == pickupWarehouse)}
                ></PickUpAssignModal>
              </li>
              <li className="list-row" hidden={status != "ready-to-pickup"}>
                {status === "ready-to-pickup" &&
                  deliveryWareHouse == pickupWarehouse && (
                    <p className="p-5 shadow">
                      No Task Needed
                      <br />
                      Agent will pick up & Deliver the parcel
                    </p>
                  )}

                {status === "ready-to-pickup" &&
                  deliveryWareHouse != pickupWarehouse && (
                    <p className="p-5 shadow flex gap-2 items-center">
                      <div className="  w-1 h-1 bg-secondary rounded-full animate-ping"></div>
                      Please Wait for Agent to pick up the parcel
                    </p>
                  )}
              </li>
              <li className="list-row">
                <button
                  onClick={() =>
                    handleParcelStatus(
                      "reached-warehouse",
                      "Parcel reached at Our WareHouse. Initiating intercity delivery process"
                    )
                  }
                  disabled={status != "in-transit"}
                  className="btn btn-primary"
                >
                  Recieve Parcel?
                </button>
              </li>

              <li className="list-row">
                <button
                  disabled={status != "reached-warehouse"}
                  onClick={() =>
                    handleParcelStatus(
                      "shipped",
                      "Parcel is shipped to destination warehouse. You will be notified when it arrives."
                    )
                  }
                  className="btn btn-primary"
                >
                  Send Parcel to Destination WareHouse
                </button>
              </li>
              <li className="list-row">
                <label
                  htmlFor="assign_modal_delivery"
                  disabled={status != "shipped"}
                  className="btn btn-primary"
                >
                  Reached at Destination WareHouse
                </label>
                <DeliveryAssignModal
                  parcelId={_id}
                  refetch={refetch}
                  wareHouse={warehouses.find(
                    (wh) => wh._id == deliveryWareHouse
                  )}
                ></DeliveryAssignModal>
              </li>

              <li className="list-row">
                {status === "ready-for-delivery" && (
                  <p className="p-5 shadow flex gap-2 items-center">
                    <div className="  w-1 h-1 bg-secondary rounded-full animate-ping"></div>
                    Agent will Deliver the Parcel as soon as Possible
                  </p>
                )}
              </li>

              <li className="list-row">
                {status === "delivered" && (
                  <p className="p-5 shadow flex gap-2 items-center bg-primary">
                    <div className="  w-1 h-1 bg-secondary rounded-full animate-ping"></div>
                    Parcel Delivered Successfully
                  </p>
                )}
              </li>
            </ol>

            <div className=" grid gap-4"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-1 gap-4 mt-6 ">
          {/* Sender Info */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Sender Information</h2>
              <p>
                <strong>Name:</strong> {senderName}
              </p>
              <p>
                <strong>Phone:</strong> {senderPhone}
              </p>
              <p>
                <strong>Email:</strong> {senderEmail}
              </p>
              <p>
                <strong>Region:</strong> {senderRegion}
              </p>
              <p>
                <strong>Address:</strong> {senderAddress}
              </p>
            </div>
          </div>

          {/* Parcel Info */}
          <div className="card bg-base-100 shadow-md col-span-full">
            <div className="card-body">
              <h2 className="card-title">Parcel Information</h2>
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Type:</strong> {type}
              </p>
              <p>
                <strong>Weight:</strong> {weight} kg
              </p>
              <p>
                <strong>Charge:</strong> ৳{charge}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`badge ${
                    status === "unpaid" ? "badge-error" : "badge-success"
                  } ml-2`}
                >
                  {status}
                </span>
              </p>
              <p>
                <strong>Pickup Instruction:</strong> {pickupInstruction}
              </p>
              <p>
                <strong>Delivery Instruction:</strong> {deliveryInstruction}
              </p>
              <p>
                <strong>Tracking No:</strong> {tracking_no || "Not assigned"}
              </p>
              <p>
                <strong>Pickup OTP:</strong> {pickup_otp || "Not assigned"}
              </p>
              <p>
                <strong>Delivery OTP:</strong> {delivery_otp || "Not assigned"}
              </p>
            </div>
          </div>
          {/* Receiver Info */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Receiver Information</h2>
              <p>
                <strong>Name:</strong> {receiverName}
              </p>
              <p>
                <strong>Phone:</strong> {receiverPhone}
              </p>
              <p>
                <strong>Region:</strong> {recieverRegion}
              </p>
              <p>
                <strong>Address:</strong> {receiverAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSingleParcel;
