import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Footer from "../ShareComponent/Footer/Footer"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useFirebase from '../Hook/useFirebase';

const SignUp = () => {
    const [error, setError] = useState("");
    const [disable, setdisable] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const { logInWithGoogle, singUPWithEmail, userName, makeUser } = useFirebase();
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.state?.from.pathname || "/";

    const onSubmit = user => {
        const { name, email, password, rePassword } = user;
        if (password === rePassword) {
            if (password.length >= 6) {
                singUPWithEmail(email, password)
                    .then(result => {
                        setError("");
                        userName(name);
                        reset();
                        navigate(url, { replace: true });
                        makeUser(name, email);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(err => setError(err.message))
            }
            else {
                setError("Password should be at least 6 charecter")
            }
        }
        else {
            setError("Password didn't match to above")
        }
    };

    //google 
    const googleLogIn = () => {
        setdisable(false);
        logInWithGoogle()
            .then(result => {
                setError("");
                navigate(url, { replace: true });
                const user = result.user;
                const { displayName, email } = user;
                makeUser(displayName, email);
                setdisable(true);
            })
            .catch(err => {
                setError(err.message)
                setdisable(true);
            })
    }
    return (
        <>
            <div className="m-3 md:m-3">
                <form
                    className="container"
                    onSubmit={handleSubmit(onSubmit)}>
                    
                    <h3 className="page-header">
                        Please Sing Up
                    </h3>
                    <p className="text-xl">
                        Your name: <input
                            className="input ml-1"
                            {...register("name", { required: true })}
                            placeholder="Enter your name"
                        />
                    </p>
                    <p className="text-xl">
                        Your email: <input
                            className="input ml-1"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                        />
                    </p>
                    <p className="text-xl">
                        Password : <input
                            className="input ml-2"
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Give a password"
                        />
                    </p>
                    <p className="text-xl">
                        Re-enter: <input
                            className="input ml-5"
                            type="password"
                            {...register("rePassword", { required: true })}
                            placeholder="re-enter the password"
                        />
                    </p>

                    <p className="text-red-400">{error}</p>

                    <div className=" flex justify-center mt-5">
                        <input
                            className="button"
                            type="submit"
                            value="Sign Up"
                        />
                    </div>

                    <p className="text-xl text-center mt-5">-------Or-------</p>
                    <div className="flex justify-center">
                        <button disabled={!disable} onClick={googleLogIn}>
                            <img
                                className="w-16 border rounded"
                                src="https://i.ibb.co/BTPQhFg/download.png"
                                alt=""
                            />
                        </button>
                    </div>
                    <p className="text-center mt-3">
                        Already have a account?
                        <Link to="/log-in">
                            log in
                        </Link>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default SignUp;