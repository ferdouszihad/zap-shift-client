import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
const Banner = () => {
  return (
    <div className="my-10 rounded-xl banner-container cursor-pointer">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        emulateTouch={true}
        dynamicHeight={true}
        interval={3000}
        // animationHandler={"fade"}
        showThumbs={false}
        showArrows={true}
        showIndicators={false}
        swipeable={true}
        showStatus={false}
      >
        <div className="">
          <img src={banner1} alt="" />
        </div>
        <div className="">
          <img src={banner2} alt="" />
        </div>
        <div className="">
          <img src={banner3} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
