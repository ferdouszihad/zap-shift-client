import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const PickUpAssignModal = ({ wareHouse, parcelId, refetch }) => {
  console.log(parcelId);
  const { user } = useAuth();
  const closeBtnref = useRef(null);
  const [selectedAgent, setSelectedAgent] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: agents = [] } = useQuery({
    queryKey: ["agents", wareHouse._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/all`);
      return res.data;
    },
  });

  const handleAssign = () => {
    if (!selectedAgent) return;
    axiosSecure
      .put(`/parcel/update-status/${parcelId}`, {
        pickupAgent: selectedAgent,
        status: "ready-to-pickup",
        statusMessage: "Pickup Assigned. Agent will call you &  pick up soon",
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
  return (
    <>
      <input type="checkbox" id="assign_modal" className="modal-toggle" />
      <div className="modal modal-lg" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          {/* warehouse card  */}
          <div className="card bg-base-100 shadow-md mb-6 card-side">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-2">
                Warehouse: {wareHouse.city}
              </h2>

              <div className="space-x-3">
                {wareHouse.covered_area.map((area) => (
                  <p key={area} className="badge badge-secondary">
                    {area}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* agents list  */}
          <div className="my-3">
            <h2 className="text-xl font-bold border-b-2 border-secondary">
              Select An Agent
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {agents.map((agent) => (
                <div
                  key={agent._id}
                  className={`card card-side shadow p-4  cursor-pointer ${
                    selectedAgent === agent.email
                      ? "bg-green-100"
                      : "bg-base-100"
                  }`}
                  onClick={() => setSelectedAgent(agent.email)}
                >
                  <figure className="">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full object-cover mb-3"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-action gap-3 justify-start">
            {selectedAgent && (
              <button onClick={handleAssign} className="btn btn-primary">
                Assign Delivery
              </button>
            )}

            <label ref={closeBtnref} htmlFor="assign_modal" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickUpAssignModal;
