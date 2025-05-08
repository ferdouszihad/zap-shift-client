import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Content1 from "./bannerContent/Content1";
import Content2 from "./bannerContent/Content2";
import Content3 from "./bannerContent/Content3";
const Banner = () => {
  return (
    <div className="bg-base-100 my-10 rounded-xl">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner"
      >
        <SwiperSlide>
          <Content1></Content1>
        </SwiperSlide>
        <SwiperSlide>
          <Content2></Content2>
        </SwiperSlide>
        <SwiperSlide>
          <Content3></Content3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
