import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFirebase from "../Hook/useFirebase";

const LogIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { logInWithGoogle, logInWithEmail, makeUser } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.from.pathname || "/";

  const onSubmit = (user) => {
    setLoading(true);
    const { email, password } = user;
    logInWithEmail(email, password)
      .then(async (result) => {
        setError("");
        const { displayName, email } = result.user;
        await makeUser(displayName, email);
        reset();
        navigate(url, { replace: true });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  //google
  const googleLogIn = () => {
    setLoading(true);
    logInWithGoogle()
      .then(async (result) => {
        setError("");
        const { displayName, email } = result.user;
        await makeUser(displayName, email);
        navigate(url, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className='m-3 md:m-3'>
        <form
          className='container my-20 bg-slate-200'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className='page-header'>Please Log In</h3>

          <p>
            Your email:{" "}
            <input
              className='input'
              type='email'
              {...register("email", { required: true })}
              placeholder='Enter your email'
            />
          </p>
          <p>
            Password:{" "}
            <input
              className='input ml-2'
              type='password'
              {...register("password", { required: true })}
              placeholder='Enter the password'
            />
          </p>

          <p className='text-red-400'>{error}</p>

          <div className=' flex justify-center mt-5'>
            <button disabled={loading} className='button' type='submit'>
              {loading ? "Loading..." : "Log In"}
            </button>
          </div>

          <p className='text-xl text-center mt-5'>-------Or-------</p>
          <div className='flex justify-center'>
            <button
              className='google-btn'
              disabled={loading}
              onClick={googleLogIn}
            >
              <img className='h-8' src='google.png' alt='' />
              <p>Google</p>
            </button>
          </div>
          <p className='text-center mt-3 text-sm'>
            New to here? <Link to='/sign-up'>sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LogIn;
