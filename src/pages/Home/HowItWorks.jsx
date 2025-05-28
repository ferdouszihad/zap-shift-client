import bookingIcon from "../../assets/bookingIcon.png";
const HowItWorks = () => {
  const works = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="lg:w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-info mb-5">How it Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {works.map((work, index) => (
          <div
            key={`how-${index}`}
            className="bg-base-100 rounded-xl p-5 space-y-5"
          >
            <img src={bookingIcon} alt="" />
            <h2 className="text-xl font-bold text-info">{work.title}</h2>
            <p className="text-accent"> {work.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
