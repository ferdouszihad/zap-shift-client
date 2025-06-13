import { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { CgProfile, CgTrack } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "react-share";
import useAxios from "../../../hooks/useAxios";

const TrackParcelRow = ({ parcel, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const axios = useAxios();

  const handleTracking = async (tracking_no) => {
    axios.get(`/tracking/${tracking_no}`).then((res) => {
      if (res.data?.status === true) {
        setHistory(res.data.history);
      } else {
        setHistory([]);
      }
    });
    setShowModal(true);
  };

  const {
    _id,
    type,
    title,
    charge,
    receiverName,

    receiverPhone,

    receiverAddress,

    recieverRegion,
    tracking_no,
    status,
  } = parcel;

  return (
    <>
      <tr>
        <td>{index}</td>
        <td className="document">
          <p>{title}</p>
          <div className="badge badge-primary text-black">{type}</div>
        </td>
        <td className="reciever">
          <p className="flex flex-wrap items-center gap-1">
            <CgProfile />
            {receiverName}
          </p>
          <p className="flex flex-wrap items-center gap-1">
            <BiPhoneCall />
            {receiverPhone}
          </p>
          <p className="flex flex-wrap items-center gap-1">
            <FaLocationDot />
            {recieverRegion}, {receiverAddress}
          </p>
        </td>
        <td>
          <h2 className="text-xl">{tracking_no}</h2>
        </td>
        <td>
          <h2>
            {status} ({charge} ৳)
          </h2>
        </td>

        <td className="space-x-3">
          <Link
            to={`/dashboard/parcel/${_id}`}
            className="btn btn-sm btn-secondary text-base-100"
          >
            <FaRegEye size={20} />
          </Link>
          <button
            className="btn btn-sm btn-primary text-black"
            onClick={() => handleTracking(tracking_no)}
            disabled={!tracking_no}
          >
            <CgTrack size={20} />
          </button>
        </td>
      </tr>

      {/* DaisyUI Modal */}
      {showModal && (
        <dialog id={`track-modal-${tracking_no}`} className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Tracking History</h3>
            <p className="text-sm text-gray-500 mb-4">
              Tracking No:{" "}
              <span className="font-mono font-semibold">{tracking_no}</span>
            </p>

            {history?.length > 0 ? (
              <ul className="timeline timeline-vertical">
                {history.map((item, idx) => (
                  <li key={item._id}>
                    {idx !== 0 && <hr className="bg-primary" />}
                    <div
                      className={`timeline-${
                        idx % 2 === 0 ? "start" : "end"
                      } timeline-box`}
                    >
                      <p className="font-semibold">{item.status}</p>
                      <p className="text-sm text-gray-500">
                        Updated by: {item.updatedBy}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(item.updatedAt).toLocaleString()}
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
            ) : (
              <p className="text-sm text-error">
                No tracking history available.
              </p>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default TrackParcelRow;
