import locationMarchent from "../../assets/location-marchant.png";
const BeAmerchant = () => {
  return (
    <div
      className={`bg-[#03373D] bg-[url(/be-amerchant-bg.png)] bg-no-repeat rounded-xl bg-blend-lighten  flex flex-col-reverse md:flex-row items-center p-10`}
    >
      <div className="flex-2 text-base-100 space-y-5 text-center md:text-left">
        <h2 className="text-3xl font-bold">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>
        <p className="text-base-200 text-sm">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <button className="btn btn-primary text-black rounded-full">
            Become a Merchant
          </button>
          <button className="btn btn-primary  rounded-full btn-outline">
            Earn with ZapShift
          </button>
        </div>
      </div>
      <div className="flex-1">
        <img src={locationMarchent} alt="" />
      </div>
    </div>
  );
};

export default BeAmerchant;
