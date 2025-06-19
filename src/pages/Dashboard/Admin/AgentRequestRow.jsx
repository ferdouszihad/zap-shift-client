import { MdCall } from "react-icons/md";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../utils/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgentRequestRow = ({ agent, refetch }) => {
  const modalId = `my_modal_4_${agent._id}`;
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const { data: warehouse = {}, isLoading } = useQuery({
    queryKey: ["warehouse", agent.wareHouseId],
    queryFn: async () => {
      const res = await axios.get(`/warehouse/${agent.wareHouseId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAgentAprove = (email) => {
    axiosSecure.patch(`/agent/approve/${email}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Agent Aproved", "agent now can work", "success");
        refetch();
      }
    });
  };
  const handleAgentReject = (email) => {
    axiosSecure.patch(`/agent/reject/${email}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Agent Rejected", "", "success");
        refetch();
      }
    });
  };

  return (
    <>
      <tr key={agent._id}>
        <td className="flex items-center gap-2">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-8 h-8 rounded-full"
          />
          {agent.name}
        </td>
        <td>
          <p>{agent.email}</p>
          <p className="badge badge-secondary">
            <MdCall /> {agent.contact}
          </p>
        </td>
        <td>{agent.region}</td>
        <td>
          <span
            className={`badge ${
              agent.status === "pending" ? "badge-warning" : "badge-success"
            }`}
          >
            {agent.status}
          </span>
        </td>
        <td className="space-x-3">
          <button
            className="btn btn-sm btn-primary text-black"
            onClick={() => document.getElementById(modalId).showModal()}
          >
            Details
          </button>
          {agent.status === "rejected" && (
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleAgentAprove(agent.email)}
            >
              Approve
            </button>
          )}

          {agent.status === "approved" && (
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleAgentReject(agent.email)}
            >
              Reject
            </button>
          )}
        </td>
      </tr>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById(modalId).close()}
            type="button"
          >
            ✕
          </button>
          <div className="flex flex-col items-center gap-4 py-4">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full border-4 border-primary shadow mb-2"
            />
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-gray-500 mb-2">{agent.region}</p>
            <div className="w-full border-t border-gray-200 my-2"></div>
            <div className="w-full grid grid-cols-2 gap-x-8 gap-y-2 text-left">
              <div>
                <span className="font-semibold">Email:</span>
                <div>{agent.email}</div>
              </div>
              <div>
                <span className="font-semibold">Contact:</span>
                <div>{agent.contact}</div>
              </div>
              <div>
                <span className="font-semibold">Age:</span>
                <div>{agent.age}</div>
              </div>
              <div>
                <span className="font-semibold">NID:</span>
                <div>{agent.nid}</div>
              </div>
              <div>
                <span className="font-semibold">Status:</span>
                <div>
                  <span
                    className={`badge ${
                      agent.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-semibold">Warehouse ID:</span>
                <div>{agent.wareHouseId}</div>
              </div>

              <div>
                <span className="font-semibold">Created At:</span>
                <div>{new Date(agent.created_at).toLocaleString("en-GB")}</div>
              </div>
            </div>
            {/* Warehouse Details */}
            <div className="w-full border-t border-gray-200 my-4"></div>
            <div className="w-full text-left">
              <h3 className="text-xl font-semibold mb-2">Selected Work Area</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <span className="font-semibold">Region:</span>
                  <div>{warehouse.region}</div>
                </div>
                <div>
                  <span className="font-semibold">District:</span>
                  <div>{warehouse.district}</div>
                </div>
                <div>
                  <span className="font-semibold">City:</span>
                  <div>{warehouse.city}</div>
                </div>

                <div>
                  <span className="font-semibold">Areas Want to Work</span>
                  <ul className="list-disc list-inside">
                    {Array.isArray(warehouse.covered_area) &&
                      warehouse.covered_area.map((area, idx) => (
                        <li key={idx}>{area}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AgentRequestRow;
