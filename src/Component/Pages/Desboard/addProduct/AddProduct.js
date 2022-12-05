import { useForm } from "react-hook-form";
import useFunc from "../../../Hook/useFunc";
import { useAlert } from "react-alert";
import addProduct from "./controller";
import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { userToken } = useFunc();
  const alert = useAlert();

  const onSubmit = (product) => {
    addProduct(product, userToken, alert, reset, setLoading);
  };

  return (
    <div className='mx-3 md:mx-0'>
      <form
        className='container lg:w-11/12 lg:grid grid-cols-2 gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='header col-span-2'>Add a product</h3>
        <div>
          <input
            className='input w-full'
            {...register("name", { required: true })}
            placeholder='Enter the name'
          />
          <input
            className='input w-full'
            {...register("category", { required: true })}
            placeholder='Enter the category'
          />
          <input
            className='input w-full'
            {...register("subCategory", { required: true })}
            placeholder='Enter the sub-category'
          />
          <input
            className='input w-full'
            {...register("price", { required: true })}
            placeholder='Enter the price'
          />
          <input
            className='input w-full'
            {...register("stock", { required: true })}
            placeholder='Enter the stock'
          />
          <label className='text-xl my-2 block'>
            Main image:
            <input className='text-sm ml-2' {...register("img")} type='file' />
          </label>
          <label className='text-xl my-2 block'>
            Gallery images:
            <input
              className='text-sm ml-2'
              {...register("gallery")}
              multiple
              type='file'
            />
          </label>
        </div>
        <textarea
          className='input'
          rows={10}
          {...register("description", { required: true })}
          placeholder='Enter short description'
        />
        <div className='col-span-2 flex justify-center'>
          <button className='button w-52' disabled={loading} type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
