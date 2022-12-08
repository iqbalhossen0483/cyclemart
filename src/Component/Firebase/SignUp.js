import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFirebase from "../Hook/useFirebase";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const { logInWithGoogle, singUPWithEmail, userName, makeUser } =
    useFirebase();
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.from.pathname || "/";

  const onSubmit = async (user) => {
    const { name, email, password, rePassword } = user;
    if (password.length <= 6) {
      return setError("Password should be at least 6 charecter");
    }
    if (password !== rePassword) {
      return setError("Password didn't match to above");
    }
    singUPWithEmail(email, password);
    setLoading(true)
      .then(async (result) => {
        setError("");
        userName(name);
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
          className='container bg-slate-200 rounded-md shadow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className='page-header'>Please Sing Up</h3>
          <p>
            Your name:{" "}
            <input
              className='input'
              {...register("name", { required: true })}
              placeholder='Enter your name'
            />
          </p>
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
            Password :{" "}
            <input
              className='input'
              type='password'
              {...register("password", { required: true })}
              placeholder='Give a password'
            />
          </p>
          <p>
            Re-enter:{" "}
            <input
              className='input'
              type='password'
              {...register("rePassword", { required: true })}
              placeholder='re-enter the password'
            />
          </p>

          <p className='text-red-400'>{error}</p>

          <div className=' flex justify-center mt-5'>
            <button className='button' type='submit'>
              {loading ? "Loading..." : "Sign Up"}
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
            Already have a account? <Link to='/log-in'>log in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
