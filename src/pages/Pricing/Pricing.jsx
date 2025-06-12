import React, { useState } from "react";
import { FaRegFileAlt, FaBoxOpen } from "react-icons/fa";
import PageTitle from "../../components/PageTitle";

export default function Pricing() {
  const [parcelType, setParcelType] = useState("non-document");
  const [destination, setDestination] = useState("within");
  const [weight, setWeight] = useState(1);
  const [charge, setCharge] = useState(0);

  const calculateCharge = () => {
    let total = 0;

    if (parcelType === "document") {
      total = destination === "within" ? 60 : 80;
    } else {
      if (weight <= 3) {
        total = 110;
      } else {
        total = 110 + (weight - 3) * 40;
      }
      if (destination === "outside") {
        total += 40;
      }
    }

    setCharge(total);
  };

  return (
    <div className="content-box  bg-base-100 p-10 my-5 rounded-2xl">
      <PageTitle
        title={"Pricing Calculator"}
        subtitle={
          "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        }
      ></PageTitle>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border bg-base-100 border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition duration-300">
          <div className="flex items-center mb-3">
            <FaRegFileAlt className="text-2xl text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Document Parcel</h2>
          </div>
          <ul className="text-gray-700 list-disc list-inside space-y-1">
            <li>Within City: ৳60</li>
            <li>Outside City: ৳80</li>
          </ul>
        </div>

        <div className="border bg-base-100 border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition duration-300">
          <div className="flex items-center mb-3">
            <FaBoxOpen className="text-2xl text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Non-Document Parcel</h2>
          </div>
          <ul className="text-gray-700 list-disc list-inside space-y-1">
            <li>Up to 3kg (Within City): ৳110</li>
            <li>Each Extra kg: +৳40</li>
            <li>Outside City: +৳40</li>
          </ul>
        </div>
      </div>
      {/* Calculator */}
      <h2 className="text-2xl font-bold text-center">Calculate Your Charge</h2>
      <div className="grid lg:grid-cols-2 content-box">
        <div className="bg-white  rounded-lg p-6 space-y-4">
          {charge !== 0 && (
            <div className=" text-xl font-bold text-secondary">
              Total Charge: ৳{charge}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">
              Parcel Type
            </label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value)}
            >
              <option value="non-document">Non-Document</option>
              <option value="document">Document</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Destination
            </label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="within">Within City</option>
              <option value="outside">Outside City</option>
            </select>
          </div>

          {parcelType === "non-document" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded p-2"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min="1"
              />
            </div>
          )}

          <div className=" space-x-4 flex">
            <button className="btn " onClick={() => setCharge(0)}>
              Reset
            </button>
            <button
              className="btn btn-primary text-black flex-1"
              onClick={calculateCharge}
            >
              Calculate Delivery Charge
            </button>
          </div>
        </div>
        <div className="justify-self-center items-center">
          <div className="text-6xl font-bold text-secondary flex items-center h-[300px]">
            ৳{charge} TK
          </div>
        </div>
      </div>
    </div>
  );
}
