import { BiCross, BiNoEntry } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { FaCross } from "react-icons/fa";
import { MdApproval, MdCall } from "react-icons/md";
import AgentViewModal from "./AgentViewModal";

const AgentRequestRow = ({
  agent,
  warehouse,
  handleAgentReject,
  handleAgentAprove,
}) => {
  return (
    <>
      <tr key={agent._id} className="hover:bg-base-200">
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
        <td>
          {warehouse?.city} , {agent.region}
        </td>
        <td>
          <span
            className={`badge ${
              agent.status === "pending"
                ? "badge-warning"
                : agent.status === "approved"
                ? "badge-primary"
                : "badge-error"
            }`}
          >
            {agent.status}
          </span>
        </td>
        <td className="flex gap-2">
          <label
            htmlFor={`agent-${agent._id}`}
            className="btn btn-sm btn-sqare btn-primary"
          >
            <BsInfoCircle></BsInfoCircle>
          </label>
          <button
            onClick={() => handleAgentAprove(agent.email)}
            className="btn btn-sm btn-sqare btn-secondary"
            disabled={agent.status == "approved"}
          >
            <MdApproval></MdApproval>
          </button>
          <button
            disabled={agent.status == "rejected"}
            onClick={() => handleAgentReject(agent.email)}
            className="btn btn-sm btn-sqare btn-error text-white"
          >
            <BiNoEntry></BiNoEntry>
          </button>
        </td>
        <AgentViewModal
          id={`agent-${agent._id}`}
          agent={agent}
          warehouse={warehouse}
        ></AgentViewModal>
      </tr>
    </>
  );
};

export default AgentRequestRow;
