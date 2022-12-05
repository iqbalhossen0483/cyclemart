import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import useFunc from "../../Hook/useFunc";

const ManageProduct = () => {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const alert = useAlert();
  const { userToken } = useFunc();

  // get data
  useEffect(() => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, []);

  // delete data
  const handleDelete = (productId, imgId) => {
    const confirm = window.confirm("Are you sure to delete");
    if (confirm) {
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: userToken(),
          imgId: imgId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert.show("delete successfull");
            const newProducts = products.filter(
              (product) => product._id !== productId
            );
            setProduct(newProducts);
          }
        });
    }
  };

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner'></div>
      </div>
    );
  }
  return (
    <div className='bg-white m-5 text-center relative'>
      <div className='grid grid-cols-6 gap-3 border-b py-3 z-0'>
        <p>Images</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Stock</p>
        <p>
          <Link to='/desboard/add-product'>Add+</Link>
        </p>
      </div>
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            className='grid grid-cols-6 gap-3 border-b py-3 items-center'
          >
            <img
              className='w-full h-32'
              src={product.productImg?.imgUrl}
              alt=''
            />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <div>
              <button
                onClick={() => handleDelete(product._id, product.imgId)}
                className='button'
              >
                Delete
              </button>
              <Link to={`/desboard/updateProduct/${product._id}`}>
                <button className='button'>Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
