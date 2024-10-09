import React from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const alert = useAlert();

  const onSubmit = (email) => {
    fetch("https://server.switchcafebd.com/cyclemart/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert.show("Make admin successful");
          reset();
        }
      });
  };
  return (
    <div className='mx-3 md:mx-0'>
      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='header'>Make an admin</h3>
        <input
          type='email'
          className='input'
          {...register("email", { required: true })}
          placeholder='Enter email address'
        />
        <input className='button' type='submit' />
      </form>
    </div>
  );
};

export default MakeAdmin;
