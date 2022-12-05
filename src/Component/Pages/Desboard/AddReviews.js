import useFirebase from "../../Hook/useFirebase";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import useFunc from "../../Hook/useFunc";
import Rating from "react-rating";

const AddReviews = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);
  const { userToken } = useFunc();
  const { user } = useFirebase();
  const alert = useAlert();

  const handleRating = (e) => {
    setRating(e);
  };
  const onSubmit = (review) => {
    review.rating = rating;
    review.img = user.photoURL;
    fetch("https://iqbal.diaryofmind.com/cyclemart/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: userToken(),
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert.show("A review was successfully added");
          reset();
        }
      });
  };

  return (
    <div className='mx-3 md:mx-0'>
      <form
        className='container lg:w-11/12 lg:grid grid-cols-2 gap-5 my-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='header col-span-2'>Your valuable comment</h3>
        <div>
          <input
            className='input w-full'
            disabled
            defaultValue={user.displayName}
            {...register("name", { required: true })}
            placeholder='Enter the name'
          />
          <input
            type='email'
            disabled
            defaultValue={user.email}
            className='input w-full'
            {...register("email", { required: true })}
            placeholder='Enter a email'
          />
          <Rating
            className='text-yellow-300 mt-7'
            onChange={handleRating}
            emptySymbol='fa fa-star-o fa-2x'
            fullSymbol='fa fa-star fa-2x'
            fractions={2}
          />
        </div>
        <textarea
          className='input'
          rows={10}
          {...register("description", { required: true })}
          placeholder='Enter short description'
        />
        <div className='col-span-2 flex justify-start'>
          <input className='button' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
