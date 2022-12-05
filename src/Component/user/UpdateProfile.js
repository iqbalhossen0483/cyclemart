import useFirebase from "../Hook/useFirebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

function UpdateProfile() {
  const { register, handleSubmit } = useForm();
  const { user } = useFirebase();
  const navigate = useNavigate();
  const alert = useAlert();

  const onSubmit = (userInfo) => {
    const formData = new FormData();
    formData.append("division", userInfo.division);
    formData.append("district", userInfo.district);
    formData.append("policeStation", userInfo.policeStation);
    formData.append("rodeOrVillage", userInfo.rodeOrVillage);
    formData.append("phone", userInfo.phone);
    formData.append("email", user.email);
    if (user.imgId) {
      formData.append("existingImg", user.imgId);
    }
    formData.append("profile", userInfo.profile[0]);

    fetch(`https://iqbal.diaryofmind.com/cyclemart/users/updateUser`, {
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
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='input my-2'
        {...register("division", { required: true })}
        placeholder='Your Division'
      />
      <input
        className='input my-2'
        {...register("district", { required: true })}
        placeholder='Your Dristrict'
      />
      <input
        className='input my-2'
        {...register("policeStation", { required: true })}
        placeholder='Police Station'
      />
      <input
        className='input my-2'
        {...register("rodeOrVillage", { required: true })}
        placeholder='Rode No. / Village name'
      />
      <input
        className='input my-2'
        {...register("phone", { required: true })}
        placeholder='Phone number'
        type='number'
      />
      <input
        className='input my-2'
        {...register("profile", { required: true })}
        type='file'
      />

      <input className='button' type='submit' />
    </form>
  );
}

export default UpdateProfile;
