import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";
import ReviewSkelator from "../../ShareComponent/skelator/ReviewSkelator";

const ReviewCarusal = ({ setError }) => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplay.current]
  );

  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setReviewLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {reviewLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ReviewSkelator />
          <ReviewSkelator />
          <ReviewSkelator />
        </div>
      ) : (
        <div className="embla" ref={emblaRef}>
          <div className="flex">
            {reviews.map((review) => {
              const { _id, description, rating } = review;
              const user = review.user[0];
              return (
                <div
                  key={_id}
                  className="review-container flex-shrink-0 w-1/3 pr-5 relative"
                >
                  <img
                    className="w-14 h-14 rounded-full mx-auto"
                    src={user?.imgUrl ? user.imgUrl : "/no-photo.png"}
                    alt=""
                  />
                  <p className="my-2">{user?.displayName}</p>
                  <Rating
                    className="text-yellow-400 text-[9px] mb-1"
                    readonly
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    initialRating={rating}
                  />
                  <p className="px-3 text-sm text-1">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCarusal;
