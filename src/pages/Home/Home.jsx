import Banner from "./Banner";
import BeAmerchant from "./BeAmerchant";
import Brands from "./Brands";
import Faq from "./Faq";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";
import Services from "./Services";
import WhyZapShift from "./WhyZapShift";

const Home = () => {
  return (
    <div>
      <title>ZapShift | Home</title>
      <section className="content-box" >
        <Banner></Banner>
      </section>
      <section className="content-box my-20">
        <HowItWorks></HowItWorks>
      </section>
      <section className="content-box my-20">
        <Services></Services>
      </section>
      <section className="content-box my-20">
        <Brands></Brands>
      </section>
      <section className="content-box my-20 border-t border-b border-info border-dashed py-20">
        <WhyZapShift></WhyZapShift>
      </section>
      <section className="content-box my-20">
        <BeAmerchant></BeAmerchant>
      </section>
      <section className="content-box my-20">
        <Reviews></Reviews>
      </section>
      <section className="content-box my-20">
        <Faq></Faq>
      </section>
    </div>
  );
};

export default Home;
