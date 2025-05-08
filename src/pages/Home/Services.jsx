import serviceIcon from "../../assets/service.png";
const Services = () => {
  const services = [
    {
      title: "Express  & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },

    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Easy Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants",
    },
  ];
  return (
    <div className="bg-[#03373D] rounded-xl py-10">
      <h2 className="text-2xl font-bold text-base-100 text-center mb-5">
        Our Services
      </h2>
      <p className="w-7/12 mx-auto text-base-200 text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="grid grid-cols-3 gap-5 w-11/12 mx-auto my-10">
        {services.map((service, index) => (
          <div
            key={`service-${index}`}
            className="bg-base-100 p-5 rounded-xl flex flex-col  justify-center items-center gap-5 text-center"
          >
            <div className="">
              <img src={serviceIcon} alt="" />
            </div>
            <h2 className="text-xl text-info font-bold">{service.title}</h2>
            <p className="text-sm text-accent">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
