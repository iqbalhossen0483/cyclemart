import useFirebase from "../Hook/useFirebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useState } from "react";

function UpdateProfile() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useFirebase();
  const navigate = useNavigate();
  const alert = useAlert();
  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", user.email);
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === "profile" && value[0]) formData.append(key, value[0]);
        formData.append(key, value);
      }
    });
    if (user.imgId && data.profile[0]) {
      formData.append("existingImg", user.imgId);
    }

    fetch(`http://localhost:5000/cyclemart/users/updateUser`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert.show("Update successfull");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          navigate("/my-account/profile");
        } else throw data;
      })
      .catch((err) => {
        alert.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='input my-2'
        {...register("division")}
        defaultValue={user?.division}
        placeholder='Your Division'
      />
      <input
        className='input my-2'
        {...register("district")}
        defaultValue={user?.district}
        placeholder='Your Dristrict'
      />
      <input
        className='input my-2'
        {...register("policeStation")}
        defaultValue={user?.policeStation}
        placeholder='Police Station'
      />
      <input
        className='input my-2'
        {...register("rodeOrVillage")}
        defaultValue={user?.rodeOrVillage}
        placeholder='Rode No. / Village name'
      />
      <input
        className='input my-2'
        {...register("phone")}
        defaultValue={user?.phone}
        placeholder='Phone number'
        type='number'
      />
      <input className='input my-2' {...register("profile")} type='file' />

      <button disabled={loading} className='button' type='submit'>
        {!loading ? " Submit" : "Loading..."}
      </button>
    </form>
  );
}

export default UpdateProfile;
