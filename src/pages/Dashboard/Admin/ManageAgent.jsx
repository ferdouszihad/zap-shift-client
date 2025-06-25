import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import { MdCall } from "react-icons/md";
import AgentRequestRow from "./AgentRequestRow";
import useWareHouseData from "../../../hooks/useWareHouseData";
import AgentViewModal from "./AgentViewModal";
import Swal from "sweetalert2";

const ManageAgents = () => {
  const axiosSecure = useAxiosSecure();
  const { warehouses } = useWareHouseData();

  const {
    data: agents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure("/agent/all");
      return res.data;
    },
  });
  console.log(agents);

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

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="content-box bg base-100 p-10 my-5">
      <PageTitle
        title={"Manage Agents"}
        subtitle={"Verify and aprove Agent for ZapShift"}
      ></PageTitle>

      <p className="text-lg text-secondary">
        Total <span className="font-bold">{agents.length}</span> Agents Found
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full mt-6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Requested Area</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <AgentRequestRow
                handleAgentAprove={handleAgentAprove}
                handleAgentReject={handleAgentReject}
                key={agent._id}
                agent={agent}
                warehouse={warehouses.find((wh) => wh._id == agent.wareHouseId)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAgents;
