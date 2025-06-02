import PageTitle from "../../components/PageTitle";
import { useForm } from "react-hook-form";
import useWareHouseData from "../../hooks/useWareHouseData";

import { useLoaderData } from "react-router";
import WareHouseCard from "../Coverage/WareHouseCard";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookParcel = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const parcelType = watch("type");
  const parcelWeight = watch("weight");
  const senderRegion = watch("senderRegion");
  const recieverRegion = watch("recieverRegion");
  const pickUpwhId = watch("pickupWarehouse");
  const deliveryWhId = watch("deliveryWareHouse");

  const { user } = useAuth();
  const { warehouses } = useWareHouseData();
  const division = useLoaderData();
  const [cost, setCost] = useState(0);
  // console.log(cost);

  useEffect(() => {
    if (parcelType == "document") {
      if (pickUpwhId == deliveryWhId) {
        setCost(60);
      } else {
        setCost(80);
      }
    } else {
      if (pickUpwhId == deliveryWhId) {
        if (deliveryWhId == pickUpwhId) {
          setCost(110);
        }
      } else {
        setCost(150);
      }

      if (parseInt(parcelWeight) > 3) {
        const newCostCount = parseInt(parcelWeight - 3);
        setCost((cost) => cost + newCostCount * 40);
      }
    }
  }, [parcelType, pickUpwhId, deliveryWhId, parcelWeight]);

  const onSubmit = (data) => {
    const {
      type,
      title,
      senderRegion,
      pickupWarehouse,
      senderName,
      senderPhone,
      senderAddress,
      pickupInstruction,
      receiverName,
      receiverPhone,
      recieverRegion,
      deliveryWareHouse,
      receiverAddress,
      deliveryInstruction,
      weight,
    } = data;

    const parcel = {
      type,
      title,
      weight,
      charge: cost,
      deliveryWareHouse,
      pickupWarehouse,
      pickupInstruction,
      deliveryInstruction,
      senderName,
      senderPhone,
      senderEmail: user?.email,
      senderAddress,
      senderRegion,
      receiverName,
      receiverPhone,
      receiverAddress,
      recieverRegion,
      tracking_no: null,
      pickup_otp: null,
      delivery_otp: null,
      status: "unpaid",
    };

    Swal.fire({
      title: `Delivery Cost - ${cost} ৳`,
      text: "Press Confirm button For Proceed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/parcel", parcel)
          .then((res) => {
            if (res.data?.insertedId) {
              Swal.fire(
                "Delivery initiated",
                `please pay ৳ ${cost} Taka to start your Delivery  `,
                "success"
              );
            } else {
              Swal.fire("Opps", "Something Went Wrong", "error");
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Opps", "Contact with Adminstrator", "error");
          });
      }
    });
  };

  return (
    <div className="rounded-xl pb-5 container">
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
                defaultValue={0.0}
                placeholder="e.g. 2.5"
                {...register("weight", {
                  required: "Weight is required for non-documents",
                  min: {
                    value: 0.0,
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
        <div className="divider"></div>

        <div className="sender">
          <h2 className="text-xl font-bold border-l-4 pl-4 my-6">
            Sender Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sender Region */}
            <div>
              <label className="block mb-1 font-medium">Sender Region</label>

              <select className="select" {...register("senderRegion")}>
                <option value="" disabled selected>
                  Select Sender Region
                </option>
                {division.map((div) => (
                  <option key={`sender-${div}`} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              {errors.senderRegion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderRegion.message}
                </p>
              )}
            </div>

            {/* PickUp Warehouse */}
            <div>
              <label className="block mb-1 font-medium">
                Select PickUp Warehouse
              </label>
              <select
                className="select select-bordered w-full"
                {...register("pickupWarehouse", {
                  required: "Please select a pickup warehouse",
                })}
              >
                <option value="">Select warehouse</option>
                {warehouses
                  .filter((wh) => wh.region == senderRegion)
                  .map((wh) => (
                    <option value={wh._id}>
                      {wh.city}- [ {wh.covered_area.join(" , ")} ]
                    </option>
                  ))}
              </select>
              {errors.pickupWarehouse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickupWarehouse.message}
                </p>
              )}
            </div>

            {/* Sender Name. */}
            <div>
              <label className="block mb-1 font-medium">Sender Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={user?.displayName}
                placeholder="Enter your / Company Name"
                {...register("senderName", {
                  required: "Contact number is required",
                })}
                readOnly
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderName.message}
                </p>
              )}
            </div>

            {/* Sender Contact No. */}
            <div>
              <label className="block mb-1 font-medium">
                Sender Contact No.
              </label>
              <input
                type="tel"
                className="input input-bordered w-full"
                placeholder="e.g. 017xxxxxxxx"
                {...register("senderPhone", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi phone number",
                  },
                })}
              />
              {errors.senderPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderPhone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Sender Address</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Village / Home / Road"
                {...register("senderAddress", {
                  required: "sender Address is required",
                })}
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderAddress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">
                PickUp Instruction -
                <div className="badge  badge-primary badge-sm text-black">
                  Optional
                </div>
              </label>

              <textarea
                className="textarea  w-full"
                {...register("pickupInstruction")}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="">
          <h2 className="text-xl font-bold border-l-4 pl-4 my-6">
            Receiver Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            {/* Receiver Name */}
            <div>
              <label className="block mb-1 font-medium">Receiver Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter receiver's full name"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverName.message}
                </p>
              )}
            </div>

            {/* Receiver Contact No. */}
            <div>
              <label className="block mb-1 font-medium">
                Receiver Contact No.
              </label>
              <input
                type="tel"
                className="input input-bordered w-full"
                placeholder="e.g. 018xxxxxxxx"
                {...register("receiverPhone", {
                  required: "Receiver contact number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi phone number",
                  },
                })}
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Reciever Region</label>

              <select className="select" {...register("recieverRegion")}>
                <option value="" disabled selected>
                  Select Reciever Region
                </option>
                {division.map((div) => (
                  <option key={`sender-${div}`} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              {errors.recieverRegion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recieverRegion.message}
                </p>
              )}
            </div>

            {/* Delivery Warehouse */}
            <div>
              <label className="block mb-1 font-medium">
                Select Delivery Warehouse
              </label>
              <select
                className="select select-bordered w-full"
                {...register("deliveryWareHouse", {
                  required: "Please select a Delivery warehouse",
                })}
              >
                <option value="">Select warehouse</option>
                {warehouses
                  .filter((wh) => wh.region == recieverRegion)
                  .map((wh) => (
                    <option value={wh._id}>
                      {wh.city}- [ {wh.covered_area.join(" , ")} ]
                    </option>
                  ))}
              </select>
              {errors.deliveryWareHouse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deliveryWareHouse.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Receiver Address</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Village / Home / Road"
                {...register("receiverAddress", {
                  required: "Receiver Address is required",
                })}
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverAddress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Delivery Instruction -
                <div className="badge  badge-primary badge-sm text-black">
                  Optional
                </div>
              </label>

              <textarea
                className="textarea  w-full"
                {...register("deliveryInstruction")}
              ></textarea>

              {errors.deliveryInstruction && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deliveryInstruction.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="mt-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary text-black w-full"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
