import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import PageTitle from "../../../components/PageTitle";

const ParcelDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = {}, isLoading } = useQuery({
    queryKey: ["details", user?.email, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <PageTitle
        title="Parcel Details"
        subtitle={`Parcel created at ${format(
          new Date(parcel.created_at),
          "PPPpp"
        )}`}
      />

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {/* Sender Info */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Sender Information</h2>
            <p>
              <strong>Name:</strong> {parcel.senderName}
            </p>
            <p>
              <strong>Phone:</strong> {parcel.senderPhone}
            </p>
            <p>
              <strong>Email:</strong> {parcel.senderEmail}
            </p>
            <p>
              <strong>Region:</strong> {parcel.senderRegion}
            </p>
            <p>
              <strong>Address:</strong> {parcel.senderAddress}
            </p>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Receiver Information</h2>
            <p>
              <strong>Name:</strong> {parcel.receiverName}
            </p>
            <p>
              <strong>Phone:</strong> {parcel.receiverPhone}
            </p>
            <p>
              <strong>Region:</strong> {parcel.recieverRegion}
            </p>
            <p>
              <strong>Address:</strong> {parcel.receiverAddress}
            </p>
          </div>
        </div>

        {/* Parcel Info */}
        <div className="card bg-base-100 shadow-md col-span-full">
          <div className="card-body">
            <h2 className="card-title">Parcel Information</h2>
            <p>
              <strong>Title:</strong> {parcel.title}
            </p>
            <p>
              <strong>Type:</strong> {parcel.type}
            </p>
            <p>
              <strong>Weight:</strong> {parcel.weight} kg
            </p>
            <p>
              <strong>Charge:</strong> ৳{parcel.charge}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`badge ${
                  parcel.status === "unpaid" ? "badge-error" : "badge-success"
                } ml-2`}
              >
                {parcel.status}
              </span>
            </p>
            <p>
              <strong>Pickup Instruction:</strong> {parcel.pickupInstruction}
            </p>
            <p>
              <strong>Delivery Instruction:</strong>{" "}
              {parcel.deliveryInstruction}
            </p>
            <p>
              <strong>Tracking No:</strong>{" "}
              {parcel.tracking_no || "Not assigned"}
            </p>
            <p>
              <strong>Pickup OTP:</strong> {parcel.pickup_otp || "Not assigned"}
            </p>
            <p>
              <strong>Delivery OTP:</strong>{" "}
              {parcel.delivery_otp || "Not assigned"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetail;
