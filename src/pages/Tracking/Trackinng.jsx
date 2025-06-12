import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";

const Trackinng = () => {
  const axios = useAxios();
  const [history, setHistory] = useState([]);
  const [parcel, setParcel] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleTracking = (e) => {
    e.preventDefault();
    const tracking_no = e.target.tracking_no.value;
    axios.get(`/tracking/${tracking_no}`).then((res) => {
      if (res.data?.status === true) {
        setHistory(res.data.history);
        setParcel(res.data.parcelInfo);
        setNotFound(false);
      } else {
        setParcel(null);
        setHistory([]);
        setNotFound(true);
      }
    });
  };

  return (
    <div className="content-box">
      <PageTitle
        title={"Track Your Consignment"}
        subtitle={"Now you can easily track your consignment"}
      />

      <div className="search my-4 flexitems-center">
        <form onSubmit={handleTracking} className="flex gap-2">
          <input
            name="tracking_no"
            className="input input-bordered w-full max-w-2xl rounded-full"
            type="number"
            max={999999}
            placeholder="Search with Your Tracking Code"
          />
          <button
            className="btn btn-primary px-10 text-black rounded-full relative right-[50px] z-10"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {notFound && (
        <p className="text-center text-red-500 font-semibold">
          Tracking info not found
        </p>
      )}

      {parcel && (
        <div className="grid md:grid-cols-2 gap-4 bg-base-100 p-6 rounded-lg shadow-md">
          {/* Product Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Product details</h2>
            <p>
              <strong>Date:</strong>{" "}
              {format(new Date(parcel.created_at), "MMM dd, yyyy hh:mm a")}
            </p>
            <p>
              <strong>Tracking Code:</strong> {parcel.tracking_no}
            </p>
            <p>
              <strong>Sender:</strong> {parcel.senderName}
            </p>
            <p>
              <strong>Phone:</strong> {parcel.senderPhone}
            </p>
            <p>
              <strong>Address:</strong> {parcel.senderAddress}
            </p>
            <p>
              <strong>Receiver:</strong> {parcel.receiverName}
            </p>
            <p>
              <strong>Receiver Phone:</strong> {parcel.receiverPhone}
            </p>
            <p>
              <strong>Receiver Address:</strong> {parcel.receiverAddress}
            </p>
            <p>
              <strong>Weight:</strong> {parcel.weight} KG
            </p>
            <p>
              <strong>Charge:</strong> ৳{parcel.charge}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 font-bold ${
                  parcel.status === "paid" ? "text-yellow-600" : "text-red-500"
                }`}
              >
                {parcel.status}
              </span>
            </p>
          </div>

          {/* Tracking Updates */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Tracking Updates</h2>
            <ul className="timeline timeline-vertical">
              {history.map((item, index) => (
                <li key={item._id}>
                  {index !== 0 && <hr className="bg-primary" />}
                  <div
                    className={
                      index % 2 === 0
                        ? "timeline-start timeline-box"
                        : "timeline-end timeline-box"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Trackinng;
