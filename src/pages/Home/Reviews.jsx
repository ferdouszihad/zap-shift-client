import customerTopImg from "../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import useReviews from "../../hooks/useReviews";
import ReviewCard from "./ReviewCard";

import "swiper/css/navigation";
const Reviews = () => {
  const { reviews } = useReviews();

  // console.log(windowSize);
  return (
    <div>
      <div className="w-full lg:w-7/12 mx-auto flex flex-col justify-center items-center gap-5 text-center pb-10">
        <img className="w-[244px]" src={customerTopImg} alt="" />
        <h2 className="text-4xl font-bold text-secondary">
          What our customers are sayings
        </h2>
        <p className="text-info">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* slider  */}

      <div className="hidden md:block">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          autoplay={true}
          loopedslides={reviews.length}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="review-swipper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="md:hidden">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          autoplay={true}
          loopedslides={reviews.length}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="review-swipper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
