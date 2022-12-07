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
    <div className='overflow-auto'>
      <table className='bg-white my-5 w-full'>
        <thead>
          <tr>
            <th>Images</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>
              <Link to='/desboard/add-product'>
                <button className='button'>Add New</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  className='w-full h-20'
                  src={product.productImg?.imgUrl}
                  alt=''
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => handleDelete(product._id, product.imgId)}
                  className='button'
                >
                  Delete
                </button>
                <Link to={`/desboard/updateProduct/${product._id}`}>
                  <button className='button'>Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;
