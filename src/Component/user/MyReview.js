import React, { useEffect, useState } from "react";
import Loader from "../ShareComponent/Loader";
import useFirebase from "../Hook/useFirebase";
import { NavLink } from "react-router-dom";
import useFunc from "../Hook/useFunc";
import Rviews from "../Pages/Home/Rviews";

const MyReview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReview] = useState([]);
  const { userToken } = useFunc();
  const { user } = useFirebase();

  useEffect(() => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/reviews", {
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const find = data.filter((review) => review.email === user.email);
        setReview(find);
        setIsLoading(false);
      });
  }, [user.email, userToken]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {reviews.length ? (
        <div className='lg:grid grid-cols-3 gap-4 md:m-10'>
          {reviews.map((review) => (
            <Rviews review={review} />
          ))}
        </div>
      ) : (
        <div className='text-xl text-center mt-8 h-auto w-40 mx-auto'>
          <p>You didn't make any review</p>
          <NavLink className='button' to='/my-account/add-review'>
            Add-Review
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MyReview;
