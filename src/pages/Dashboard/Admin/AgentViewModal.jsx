const AgentViewModal = ({ agent, warehouse }) => {
  return (
    <>
      <input
        type="checkbox"
        id={`agent-${agent._id}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-3xl p-0">
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex flex-col md:flex-row-reverse items-center justify-between gap-4">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <div className="">
              <h3 className="text-2xl font-bold">{agent.name}</h3>
              <div className="mt-2 space-y-1">
                <p>
                  <span className="font-semibold">NID:</span> {agent.nid}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {agent.age}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {agent.contact}
                </p>
              </div>
            </div>
          </div>

          {/* CV Body */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Personal Information
              </h4>
              <p>
                <span className="font-medium">Name:</span> {agent.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {agent.email}
              </p>
              <p>
                <span className="font-medium">Region:</span> {agent.region}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                <span
                  className={`ml-1 font-semibold ${
                    agent.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {agent.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(agent.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Earning:</span> ${agent.earning}
              </p>
            </div>

            {/* Warehouse Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Warehouse Information
              </h4>
              <p>
                <span className="font-medium">Region:</span> {warehouse?.region}
              </p>
              <p>
                <span className="font-medium">District:</span>{" "}
                {warehouse?.district}
              </p>
              <p>
                <span className="font-medium">City:</span> {warehouse?.city}
              </p>
              <p>
                <span className="font-medium">Status:</span> {warehouse?.status}
              </p>
              <p>
                <span className="font-medium">Covered Areas:</span>{" "}
                {warehouse?.covered_area?.join(", ")}
              </p>
            </div>
          </div>

          {/* Footer Button */}
          <div className="modal-action px-6 pb-4">
            <label
              htmlFor={`agent-${agent._id}`}
              className="btn btn-sm btn-outline"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentViewModal;
