import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (email) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/users/admin`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successful");
          reset();
        }
      });
  };
  return (
    <div className="mx-3 md:mx-0">
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="header">Make an admin</h3>
        <input
          type="email"
          className="input"
          {...register("email", { required: true })}
          placeholder="Enter email address"
        />
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default MakeAdmin;
