import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import PageTitle from "../../../components/PageTitle";
import { formatDistanceToNow } from "date-fns";
import { GrUserAdmin, GrUserWorker } from "react-icons/gr";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/user/all");
      return res.data;
    },
  });
  const handleMerchantReq = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will Lost Access of Admin Panael!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Making Marchent for", email);
        const res = await axiosSecure.patch(`/user/merchant/${email}`);
        console.log(res);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Marchent request Approved successfully",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Marchent request Denied ",
            icon: "error",
          });
        }
      }
    });
  };
  const handleAdminReq = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will Get Access to everything!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Him Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Making Admin for", email);
        const res = await axiosSecure.patch(`/user/admin/${email}`);
        console.log(res);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Admin request Approved successfully",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Admin request Denied ",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto p-4">
      <PageTitle
        title={"Manage Users"}
        subtitle={"View , Controll and Manage Users "}
      ></PageTitle>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Role</th>
              <th>Joined_At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.photoURL ||
                            "https://img.icons8.com/?size=48&id=0C05f55sN8hD&format=png"
                          }
                          alt={user?.displayName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.role || "User"}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.role ? user.role : "Regular User"}
                  </span>
                </td>

                <td
                  title={new Date(user.createdAt).toLocaleString()}
                  className="tooltip text-xs"
                >
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </td>
                <th className="space-x-5">
                  {user.role == "merchant" || user.role == "agent" ? (
                    <button
                      onClick={() => handleAdminReq(user.email)}
                      className="btn btn-xs btn-primary"
                    >
                      <GrUserAdmin className="inline mr-1" />
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMerchantReq(user?.email)}
                      className="btn btn-xs btn-secondary"
                    >
                      <GrUserWorker></GrUserWorker>
                      Make Marchent
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
