import PageTitle from "../../components/PageTitle";
import Services from "../Home/Services";
import WhyZapShift from "../Home/WhyZapShift";

const ServicePage = () => {
  return (
    <div className="container ">
      <PageTitle
        title={"Our Services"}
        subtitle={"Let's Explore All our Services "}
      ></PageTitle>

      <section className="py-5">
        <WhyZapShift></WhyZapShift>
      </section>

      <section className="py-5">
        <Services></Services>
      </section>
    </div>
  );
};

export default ServicePage;
