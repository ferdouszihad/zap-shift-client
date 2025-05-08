import { SwiperSlide } from "swiper/react";
import reviewQuote from "../../assets/reviewQuote.png";
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-base-100 rounded-xl py-10 px-5 space-y-5 h-full">
      <img src={reviewQuote} alt="" />

      <p className="pb-5 border-b-2 border-dashed border-secondary">
        {review.review}
      </p>
      <div className="flex gap-2 items-center">
        <div className="w-16 h-16 rounded-full">
          <img className="rounded-full" src={review.user_photoURL} alt="" />
        </div>
        <div className="">
          <h2 className="text-secondary font-bold">{review.userName}</h2>
          <p className="text-secondary ">{review?.date.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
