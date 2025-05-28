import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import casio from "../../assets/casio-2 1.png";
import amazon from "../../assets/logo-amazon 1.png";
import moonstar from "../../assets/moonstar 1.png";
import starplus from "../../assets/start--1 1.png";
import startpeople from "../../assets/start-people 1.png";
import randstad from "../../assets/randstad.png";

const Brands = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-2xl mb-10">
        We've helped thousands of sales teams
      </h2>
      <div className="">
        <Swiper
          loop={true}
          loopedSlides={6}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          slidesPerView={4}
          grabCursor={true}
          className="mySwiper items-center"
        >
          <SwiperSlide>
            <img src={casio} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={amazon} alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={moonstar} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={starplus} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={startpeople} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={randstad} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
