import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../utils/Loading";
import { MdCall } from "react-icons/md";
import AgentRequestRow from "./AgentRequestRow";
import AgentViewModal from "./AgentViewModal";
// data
// {
//     "_id": "684a6905c74ba799d8a320ee",
//     "name": "F M ZAHIDULM ISLAM",
//     "email": "test.user413@gmail.com",
//     "image": "https://i.ibb.co/gbqDK5L6/my-pp.jpg",
//     "age": "30",
//     "region": "Barisal",
//     "wareHouseId": "6836bae46476183c1cad22ad",
//     "contact": "01987654321",
//     "nid": "1234567890",
//     "status": "pending",
//     "created_at": "2025-06-12T05:43:33.412Z",
//     "earning": 0
// }
const AgentRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: agents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure("/agent/applied");
      return res.data;
    },
  });
  console.log(agents);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="content-box bg base-100 p-10 my-5">
      <PageTitle
        title={"Agent Requets"}
        subtitle={"Verify and aprove Agent for ZapShift"}
      ></PageTitle>

      <p className="text-lg text-secondary">
        Total <span className="font-bold">{agents.length}</span> Request Pending
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full mt-6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Region</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <AgentRequestRow
                key={agent._id}
                agent={agent}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentRequest;
