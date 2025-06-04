import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router";

import { FaAmazonPay, FaRegEye } from "react-icons/fa";

const ParcelRow = ({ parcel, index, handleDelete }) => {
  //   console.log(Object.keys(parcel).join(","));
  const { _id, type, title, charge, receiverName, receiverPhone } = parcel;
  return (
    <tr className="hover:bg-base-300 items-center">
      <th>{index}</th>
      <td className="flex flex-col gap-1">
        {title}
        <p className="badge badge-sm badge-primary text-black">{type}</p>
      </td>
      <td>{type}</td>
      <td>
        {receiverName}
        <p>{receiverPhone}</p>
      </td>
      <td>{charge} ৳</td>
      <td className="flex gap-2 flex-wrap justify-end items-center">
        <Link
          to={`/dashboard/payment/${_id}`}
          className="btn btn-sm btn-primary text-black"
        >
          <FaAmazonPay size={24}></FaAmazonPay>
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-sm btn-error text-base-100"
        >
          <MdOutlineDeleteOutline size={24}></MdOutlineDeleteOutline>
        </button>
        <Link
          to={`/dashboard/parcel/${_id}`}
          className="btn btn-sm btn-secondary text-base-100"
        >
          <FaRegEye size={20}></FaRegEye>
        </Link>
      </td>
    </tr>
  );
};

export default ParcelRow;
