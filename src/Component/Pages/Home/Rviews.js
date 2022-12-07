import React from "react";
import Rating from "react-rating";

const Rviews = (props) => {
  const { description, rating } = props.review;
  const user = props.review.user[0];
  return (
    <div className='review-container'>
      <img
        className='w-14 h-14 rounded-full mx-auto'
        src={user?.imgUrl ? user.imgUrl : "no-photo.png"}
        alt=''
      />

      <p className='my-2'>{user?.displayName}</p>
      <Rating
        className='text-yellow-400 text-[9px] mb-1'
        readonly
        emptySymbol='fa fa-star-o fa-2x'
        fullSymbol='fa fa-star fa-2x'
        fractions={2}
        initialRating={rating}
      />
      <p className='px-3 text-sm text-1'>{description}</p>
    </div>
  );
};

export default Rviews;
