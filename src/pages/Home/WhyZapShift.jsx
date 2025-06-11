import liveParcelImg from "../../assets/live-tracking.png";
import seafeDeliveryImg from "../../assets/safe-delivery.png";
const WhyZapShift = () => {
  const goals = [
    {
      img: liveParcelImg,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-5">
      {goals.map((goal, index) => (
        <div
          key={`goal-${index}`}
          data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
          className="card md:card-side items-center bg-base-100 shadow-sm p-5 gap-5 rounded-xl "
        >
          <figure className="">
            <img src={goal.img ? goal.img : seafeDeliveryImg} alt="Movie" />
          </figure>
          <div className="border-r hidden md:block border-dashed border-info h-[100%] ml-5"></div>
          <div className="card-body flex-1">
            <h2 className="card-title">{goal.title}</h2>
            <p>{goal.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyZapShift;
