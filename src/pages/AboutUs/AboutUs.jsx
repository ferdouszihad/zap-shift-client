import React from "react";
import { FaUsers, FaHistory, FaHandshake } from "react-icons/fa";
import PageTitle from "../../components/PageTitle";

export default function AboutUs() {
  return (
    <div className="container pb-5">
      <PageTitle title={"About Zapshift"}></PageTitle>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-primary hover:bg-base-100 rounded-lg p-6 shadow hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <FaUsers className="text-2xl text-secondary mr-2" />
            <h2 className="text-xl font-semibold">Who We Are</h2>
          </div>
          <p className="text-gray-700">
            Zapshift is a next-gen parcel delivery platform dedicated to
            providing fast, transparent, and affordable logistics solutions for
            businesses and individuals.
          </p>
        </div>

        <div className="border border-primary hover:bg-base-100 rounded-lg p-6 shadow hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <FaHistory className="text-2xl text-info mr-2" />
            <h2 className="text-xl font-semibold">Our Journey</h2>
          </div>
          <p className="text-gray-700">
            Founded in 2023, Zapshift has grown from a small team to a
            national-level service provider trusted by thousands for timely
            deliveries.
          </p>
        </div>

        <div className="border border-primary hover:bg-base-100 rounded-lg p-6 shadow hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <FaHandshake className="text-2xl text-primary mr-2" />
            <h2 className="text-xl font-semibold">Our Promise</h2>
          </div>
          <p className="text-gray-700">
            We promise reliability, transparency, and excellence in every
            shipment. Your trust powers our innovation and drives us forward.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-100 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <img
            src="https://d23xypyp2dkdqm.cloudfront.net/wp-content/uploads/2022/01/31034059/woman-hand-accepting-delivery-boxes-from-deliveryman-1.jpg"
            alt="Zapshift delivery"
            className="w-full md:w-1/2 h-auto rounded-lg"
          />
          <p className="text-gray-800 md:w-1/2">
            What started as a small idea among passionate problem-solvers has
            transformed into one of the most reliable logistics platforms in the
            country. Our journey began with the belief that parcel delivery
            could be smarter, more efficient, and customer-focused. Through
            consistent innovation and a dedication to solving real-world
            delivery challenges, we built a system that prioritizes transparency
            and convenience.
            <br />
            <br />
            From managing a handful of local deliveries to scaling our
            operations nationwide, our commitment has remained unchanged—every
            package, regardless of its size or destination, matters. We
            understand how important it is for businesses and individuals to
            send and receive parcels securely and on time. That’s why we focus
            on building technology-driven logistics infrastructure that is both
            affordable and dependable.
            <br />
            <br />
            Today, Zapshift serves thousands of happy customers across the
            country. We take pride in the trust we’ve earned, and we are more
            motivated than ever to redefine delivery standards and exceed
            expectations at every step. Our story is not just about
            logistics—it’s about making connections, empowering businesses, and
            delivering satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
