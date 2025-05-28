import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";

const BookParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const parcelType = watch("type"); // Watch parcel type selection

  const onSubmit = (data) => console.log(data);

  return (
    <div className="rounded-xl py-3 container">
      <PageTitle
        title={"Book Parcel Delivery"}
        subtitle={
          "Our Pick up agent will pick up your product from your location in a short"
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold border-l-4 pl-4 mb-4">
          Enter Your Parcel Details
        </h2>
        {/* Parcel Type */}
        <div>
          <label className="block mb-2 font-medium">Parcel Type</label>
          <div className="flex gap-5">
            <label className="flex items-center gap-2">
              <input
                {...register("type", {
                  required: "Please select a parcel type",
                })}
                type="radio"
                className="radio"
                value="document"
              />
              Document
            </label>

            <label className="flex items-center gap-2">
              <input
                {...register("type", {
                  required: "Please select a parcel type",
                })}
                type="radio"
                className="radio"
                value="non-document"
              />
              Non-Document
            </label>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          {/* Parcel Name */}
          <div className="flex-1">
            <label className="block mb-1 font-medium">Parcel Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Your Parcel Name"
              {...register("title", { required: "Parcel name is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Conditional Weight Field */}
          {parcelType === "non-document" && (
            <div className="flex-1">
              <label className="block mb-1 font-medium">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                className="input input-bordered w-full"
                placeholder="e.g. 2.5"
                {...register("weight", {
                  required: "Weight is required for non-documents",
                  min: {
                    value: 0.1,
                    message: "Weight must be at least 0.1 kg",
                  },
                })}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary text-black" type="submit">
          Submit Parcel Info
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
