import Lottie from "react-lottie";
import PageTitle from "../../components/PageTitle";
import rider from "../../assets/json/rider.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLoaderData } from "react-router";
import useWareHouseData from "../../hooks/useWareHouseData";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../utils/Loading";
import pendingAgent from "../../assets/agent-pending.png";

const RiderRegistraion = () => {
  const { user } = useAuth();
  const regions = useLoaderData();

  const { warehouses } = useWareHouseData();
  const axiosSecure = useAxiosSecure();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agent", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const region = watch("region");

  const onSubmit = (data) => {
    const registrationData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      age: data.age,
      region: data.region,
      wareHouseId: data.warehouse,
      contact: data.contact,
      nid: data.nid,
    };

    axiosSecure.post("/agent", registrationData).then((res) => {
      if (res.data?.insertedId) {
        Swal.fire("Great", "Our Team will Analyze your Request", "success");
        refetch();
      }
    });

    // navigate("/");
  };

  const handleReApply = () => {
    axiosSecure.delete(`/agent/${user?.email}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(data);

  if (data?.status == "pending") {
    return (
      <div className="bg-base-100 content-box my-5 rounded-2xl flex flex-col min-h-screen justify-center items-center gap-5">
        <div className="">
          <img className="w-[200px]" src={pendingAgent} alt="" />
        </div>
        <h2 className="font-bold text-6xl text-secondary">
          Your Request for Be a Rider is Pending
        </h2>
        <Link to={"/"} className="btn btn-primary text-black">
          Go To Home
        </Link>
      </div>
    );
  }
  if (data?.status == "rejected") {
    return (
      <div className="bg-base-100 content-box my-5 rounded-2xl flex flex-col min-h-screen justify-center items-center gap-5">
        <div className="">
          <img className="w-[200px]" src={pendingAgent} alt="" />
        </div>
        <h2 className="font-bold text-5xl text-secondary">
          Your Request for Be a Rider is Rejected
        </h2>
        <button className="btn btn-secondary" onClick={handleReApply}>
          ReApply
        </button>
        <Link to={"/"} className="btn btn-primary text-black">
          Go To Home
        </Link>
      </div>
    );
  }
  if (data?.status == "approved") {
    return (
      <div className="bg-base-100 content-box my-5 rounded-2xl flex flex-col min-h-screen justify-center items-center gap-5">
        <h2 className="text-2xl font-bold text-center">Yahoo</h2>
        <div className="">
          <img className="w-[200px]" src={pendingAgent} alt="" />
        </div>
        <h2 className="font-bold text-5xl text-secondary">
          Your Request for Be a Rider is Approved
        </h2>

        <Link to={"/dashboard"} className="btn btn-primary text-black">
          Go To dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="content-box my-5 p-10 bg-base-100 rounded-2xl">
      <PageTitle
        title={"Be a Rider"}
        subtitle={
          "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        }
      ></PageTitle>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="bg-base-100 rounded-xl">
          <h2 className="font-bold text-2xl text-secondary">
            Tell us about yourself
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form my-5 grid lg:grid-cols-2 gap-5"
          >
            {/* Name (Read Only) */}
            <div className="User-Name flex-2">
              <label>Your Name</label>
              <input
                defaultValue={user?.displayName}
                type="text"
                className="input w-full bg-gray-100"
                readOnly
              />
            </div>

            {/* Age */}
            <div className="User-Age flex-1">
              <label>Your Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                className={`input w-full ${errors.age ? "input-error" : ""}`}
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Minimum age is 18" },
                  max: { value: 45, message: "Maximum age is 45" },
                })}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email (Read Only) */}
            <div>
              <label>Your Email</label>
              <input
                defaultValue={user?.email}
                type="email"
                className="input w-full bg-gray-100"
                readOnly
              />
            </div>

            {/* Region */}
            <div className="region flex-1">
              <label>Region</label>
              <select
                className={`select block w-full ${
                  errors.region ? "input-error" : ""
                }`}
                {...register("region", {
                  required: "Region is required",
                })}
              >
                <option value="" disabled selected>
                  Select Your Region
                </option>
                {regions.map((div, index) => (
                  <option key={index} value={div}>
                    {div}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* Contact No */}
            <div className="User-Contact ">
              <label>Contact No.</label>
              <input
                type="tel"
                placeholder="01XXXXXXXXXX"
                className={`input w-full ${
                  errors.contact ? "border-red-500" : ""
                }`}
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^(?:\+88|88)?01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi number",
                  },
                })}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* NID */}
            <div className="NID flex-1">
              <label>Your NID</label>
              <input
                type="number"
                placeholder="Enter your 10-digit NID"
                className={`input w-full ${errors.nid ? "border-red-500" : ""}`}
                {...register("nid", {
                  required: "NID is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "NID must be exactly 10 digits",
                  },
                })}
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nid.message}
                </p>
              )}
            </div>

            {/* Warehouse */}
            <div className="col-span-full">
              <div className="region flex-1">
                <label>Which Warehouse You want to work?</label>
                <select
                  className={`select block w-full ${
                    errors.warehouse ? "input-error" : ""
                  }`}
                  {...register("warehouse", {
                    required: "Warehouse is required",
                  })}
                >
                  <option value="" disabled selected>
                    Select Your Region
                  </option>
                  {warehouses
                    ?.filter((wh) => wh.region == region)
                    .map((wh) => (
                      <option key={wh._id} value={wh._id}>
                        {wh.city} [ {wh.covered_area.join(" , ")} ]
                      </option>
                    ))}
                </select>
                {errors.warehouse && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.warehouse.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <button
                type="submit"
                className="btn btn-primary text-black btn-block"
              >
                Be a Rider
              </button>
            </div>
          </form>
        </div>

        {/* Lottie Animation */}
        <div className="w-full" data-aos="fade-right">
          <Lottie options={{ animationData: rider }} />
        </div>
      </div>
    </div>
  );
};

export default RiderRegistraion;
