const ParcelStatusUI = ({ status, isSameServiceCenter }) => {
  return (
    <div className="space-y-4">
      <ol className="list-decimal ml-6 space-y-4">
        {/* 1. Assign Parcel for PickUp */}
        <li>
          <label
            htmlFor="assign_modal_delivery"
            className="btn btn-primary"
            disabled={status !== "paid"}
          >
            Assign Parcel for PickUp
          </label>
        </li>

        {/* 2. Parcel Received by Rider Card */}
        {status === "ready-to-pickup" && (
          <li>
            <div className="card bg-green-100 p-4 shadow">
              <h3 className="text-lg font-semibold">
                Parcel Received by Rider
              </h3>
              <p>Status: {status}</p>
            </div>
          </li>
        )}

        {/* 3. Confirm Parcel Received */}
        {!isSameServiceCenter && (
          <li>
            <button
              className="btn btn-accent"
              disabled={status !== "in-transit"}
            >
              Confirm Parcel Received
            </button>
          </li>
        )}

        {/* 4. Ship Parcel */}
        {!isSameServiceCenter && (
          <li>
            <button
              className="btn btn-info"
              disabled={status !== "reached-service-center"}
            >
              Ship Parcel
            </button>
          </li>
        )}

        {/* 5. Assign Parcel for Delivery */}
        {!isSameServiceCenter && (
          <li>
            <button
              className="btn btn-secondary"
              disabled={status !== "shipped"}
            >
              Assign Parcel for Delivery
            </button>
          </li>
        )}

        {/* 6. Parcel Delivery by Rider Card */}
        {status === "ready-for-delivery" && (
          <li>
            <div className="card bg-yellow-100 p-4 shadow">
              <h3 className="text-lg font-semibold">Parcel Out for Delivery</h3>
              <p>Status: {status}</p>
            </div>
          </li>
        )}

        {/* 7. Parcel Delivery Successfull Card */}
        {status === "delivered" && (
          <li>
            <div className="card bg-blue-100 p-4 shadow">
              <h3 className="text-lg font-semibold">
                Parcel Delivered Successfully
              </h3>
              <p>Status: {status}</p>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
};

export default ParcelStatusUI;
