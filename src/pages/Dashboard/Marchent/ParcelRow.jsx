import { Link } from "react-router";

const ParcelRow = ({ parcel, index }) => {
  //   console.log(Object.keys(parcel).join(","));
  const { _id, type, title, charge, receiverName, receiverPhone } = parcel;
  return (
    <tr className="hover:bg-base-300">
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
      <td className="flex gap-2 flex-wrap justify-end">
        <Link
          to={`/dashboard/payment/${_id}`}
          className="btn btn-sm btn-primary text-black"
        >
          Pay Now
        </Link>
        <button className="btn btn-sm btn-error">Cancel</button>
      </td>
    </tr>
  );
};

export default ParcelRow;
