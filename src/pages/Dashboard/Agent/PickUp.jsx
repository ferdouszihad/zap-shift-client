import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import { MdCall } from "react-icons/md";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const PickUp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentParcel, setCurrentParcel] = useState({});
  const closeBtnref = useRef(null);
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pickUpRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/pickup/${user?.email}`);
      return res.data;
    },
  });

  const handlePickUp = async (e) => {
    e.preventDefault();
    const trackingNo = e.target.tracking_no.value;
    if (!trackingNo) {
      return;
    }

    if (trackingNo != currentParcel.tracking_no) {
      Swal.fire("Opps", `${currentParcel.tracking_no}`, "error");
      return;
    }

    axiosSecure
      .put(`/parcel/update-status/${currentParcel._id}`, {
        status: "in-transit",
        //for tracking
        statusMessage: "Parcel picked up successfully form sender.",
        updatedBy: user?.displayName,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("success", "Delivery assigned successfully!", "success");
          closeBtnref.current.click(); // Close the modal
          refetch();
        } else {
          Swal.fire(
            "Opps!",
            "Failed to assign delivery. Please try again.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error assigning delivery:", error);
        alert("An error occurred while assigning the delivery.");
      });
  };

  console.log(parcels);
  if (isLoading) {
    <Loading></Loading>;
  }
  return (
    <div className="content-box my-5">
      <PageTitle
        title="Parcel To Pick Up"
        subtitle="Manage your pick up requests here."
      />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Sender</th>
              <th>Parcel</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>
                  <div>
                    <div className="font-bold">{parcel.senderName}</div>
                    <div className="text-sm opacity-70">
                      {parcel.senderPhone}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-semibold capitalize">
                      {parcel.type}
                    </div>
                    <div className="text-xs">Charge: {parcel.charge}৳</div>
                    <div className="text-xs">
                      Tracking: {parcel.tracking_no}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{parcel.senderAddress}</div>

                    <div className="text-xs badge">
                      {parcel.pickupInstruction}
                    </div>
                  </div>
                </td>
                <td className="space-x-2">
                  <a
                    href={`tel:+88${parcel.senderPhone}`}
                    className="btn btn-primary btn-sm"
                  >
                    <MdCall />
                  </a>
                  <label
                    onClick={() => setCurrentParcel(parcel)}
                    htmlFor="confirm-otp"
                    className="btn btn-primary"
                  >
                    Complete PickUP
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parcels.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No parcels to pick up.
          </div>
        )}
      </div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-otp" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-3">Confirm Pickup</h2>
          <form onSubmit={handlePickUp}>
            <input
              type="number"
              name="tracking_no"
              placeholder="Enter Tracking Number"
              className="input input-bordered w-full mb-4"
              required
            />
            <div className="space-x-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <label ref={closeBtnref} htmlFor="confirm-otp" className="btn">
                Close!
              </label>
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default PickUp;
