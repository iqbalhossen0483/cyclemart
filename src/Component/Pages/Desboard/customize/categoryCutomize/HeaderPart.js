import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

import useFunc from "../../../../Hook/useFunc";

const HeaderPart = ({ categoryForm, setCategoryForm, setUpdate, update }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { userToken } = useFunc();
  const alert = useAlert();

  const onSubmit = (menu) => {
    setLoading(true);
    fetch("https://server.switchcafebd.com/cyclemart/menus", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: userToken(),
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          setCategoryForm(false);
          alert.show("menu added");
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      })
      .catch((err) => alert.error(err.message))
      .finally(() => setLoading(false));
  };

  const showCategoryForm = (e) => {
    e.stopPropagation();
    setCategoryForm(true);
  };

  return (
    <div className='bg-primary rounded-t text-gray-200 flex justify-evenly z-50'>
      <p className='font-medium py-2'>Category Menus</p>
      <button onClick={(e) => showCategoryForm(e)}>Add+</button>

      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${categoryForm ? "block" : "hidden"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='customize-form w-full'>
          <input
            className='input w-full'
            {...register("name", { required: true })}
            placeholder='Enter category name'
          />
          <button className='button' disabled={loading} type='submit'>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeaderPart;
