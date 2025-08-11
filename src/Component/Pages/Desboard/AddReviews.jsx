import { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";

import { toast } from "react-toastify";
import useFirebase from "../../Hook/useFirebase";
import useFunc from "../../Hook/useFunc";

const AddReviews = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const { userToken } = useFunc();
  const { user } = useFirebase();

  const handleRating = (e) => {
    setRating(e);
  };
  const onSubmit = (review) => {
    setLoading(true);
    review.user_id = user._id;
    review.rating = rating;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: userToken(),
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("A review was successfully added");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-3 md:mx-0">
      <form
        className="container lg:w-11/12 my-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="header">Your valuable comment</h3>

        <textarea
          className="input"
          rows={10}
          {...register("description", { required: true })}
          placeholder="Enter short description"
        />
        <Rating
          className="text-yellow-300 text-sm mt-7"
          onChange={handleRating}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
        />
        <div className="col-span-2 flex justify-start">
          <button disabled={loading} className="button" type="submit">
            {!loading ? "Submit" : "Loading..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
