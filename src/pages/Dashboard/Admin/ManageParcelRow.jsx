import { FaLocationArrow } from "react-icons/fa";
import useWareHouseData from "../../../hooks/useWareHouseData";
import { Link, useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { BiInfoCircle } from "react-icons/bi";
import { BsGearFill } from "react-icons/bs";
import Swal from "sweetalert2";

const ManageParcelRow = ({ parcel }) => {
  const { warehouses } = useWareHouseData();
  const navigate = useNavigate();
  const {
    _id,

    charge,
    deliveryWareHouse,
    pickupWarehouse,

    status,
    created_at,
  } = parcel;
  return (
    <tr key={parcel._id}>
      <td className="">
        <div className="flex flex-col gap-2 *:text-nowrap">
          <p>
            <FaLocationArrow className="inline mr-2 text-primary"></FaLocationArrow>
            {warehouses.find((wh) => wh._id == pickupWarehouse)?.city}
          </p>
          <p>
            <FaLocationArrow className="inline mr-2 text-secondary"></FaLocationArrow>
            {warehouses.find((wh) => wh._id == deliveryWareHouse)?.city}
          </p>
        </div>
      </td>

      <td>
        {status}
        <p>{status == "paid" && `(${charge} BDT)`}</p>
      </td>
      <td>
        <div className="badge badge-secondary">
          {pickupWarehouse == deliveryWareHouse
            ? "Inner-City Delivery"
            : "Outside-City Delivery"}
        </div>
      </td>
      <td>{formatDistanceToNow(new Date(created_at))} Ago</td>

      <td className="space-x-3">
        <Link
          to={`/dashboard/parcel/${_id}`}
          className="btn btn-primary btn-sm"
        >
          <BiInfoCircle></BiInfoCircle>
        </Link>

        <button
          onClick={() =>
            status == "unpaid"
              ? Swal.fire("Not-Paid", "Payment is Still Pending", "error")
              : navigate(`/dashboard/manage-parcels/${_id}`)
          }
          className="btn btn-primary btn-sm"
        >
          <BsGearFill></BsGearFill> Manage
        </button>
      </td>
    </tr>
  );
};

export default ManageParcelRow;
