import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFunc from "../../../Hook/useFunc";
import { useForm } from "react-hook-form";
import updateProduct from "./controller";
import { useParams } from "react-router";
import { useAlert } from "react-alert";

const UpdateProduct = () => {
  const [oneProductUpdate, setOneProductUpdate] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [product, setProduct] = useState({});
  const { userToken } = useFunc();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    fetch(`https://iqbal.diaryofmind.com/cyclemart/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, oneProductUpdate]);

  const onSubmit = (newData) => {
    updateProduct(
      newData,
      product,
      userToken,
      alert,
      oneProductUpdate,
      setOneProductUpdate,
      reset,
      navigate
    );
  };
  return (
    <div>
      <div className='flex justify-center items-center '>
        <form
          onClick={(e) => e.stopPropagation()}
          className='container lg:w-11/12 lg:grid grid-cols-2 gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className='header col-span-2'>Update Product</h3>
          <div>
            <input
              className='input w-full'
              {...register("name")}
              defaultValue={product.name}
              placeholder='Enter the name'
            />
            <input
              className='input w-full'
              {...register("category")}
              defaultValue={product.category}
              placeholder='Enter the category'
            />
            <input
              className='input w-full'
              {...register("subCategory")}
              defaultValue={product?.subCategory}
              placeholder='Enter the sub-category'
            />
            <input
              className='input w-full'
              {...register("price")}
              defaultValue={product.price}
              placeholder='Enter the price'
            />
            <input
              className='input w-full'
              {...register("stock")}
              defaultValue={product.stock}
              placeholder='Enter the stock'
            />
            <label className='text-xl my-2 block'>
              Main image:
              <input
                className='text-sm ml-2'
                {...register("img")}
                type='file'
              />
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
            className='input text-justify'
            rows={10}
            {...register("description")}
            defaultValue={product.description}
            placeholder='Enter short description'
          />
          <div className='col-span-2 flex justify-center'>
            <input className='button w-52' type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
