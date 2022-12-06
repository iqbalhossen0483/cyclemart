import React, { useEffect, useState } from "react";
import useFirebase from "../Hook/useFirebase";
import useFunc from "../Hook/useFunc";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const ViewCart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { addedProduct, setAddedProduct } = useFunc();
  const [isLoading, setIsLoading] = useState(true);
  const [allId, setAllId] = useState("");
  const { user } = useFirebase();
  const alert = useAlert();

  //find cart products
  useEffect(() => {
    let url = "";
    if (addedProduct) {
      for (const cart of addedProduct) {
        url += "&&" + cart.id;
      }
      setAllId(url);
    }

    if (allId) {
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/${url}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((product) => {
            for (const cart of addedProduct) {
              if (product._id === cart.id) {
                return (product.quantity = cart.quantity);
              }
            }
          });
          setCartProducts(data);
        });
    }
    setIsLoading(false);
  }, [addedProduct, allId]);

  //quantity increase decrease
  const handlePlusMinus = (id, action) => {
    const newCart = [];
    for (const product of cartProducts) {
      if (product._id === id) {
        if (action === "minus" && product.quantity >= 2) {
          const newCart = [];
          product.quantity -= 1;
          for (const cart of addedProduct) {
            if (cart.id === id) {
              cart.quantity -= 1;
              newCart.push(cart);
            } else {
              newCart.push(cart);
            }
          }
          setAddedProduct(newCart);
        }
        if (action === "plus") {
          const newCart = [];
          product.quantity += 1;
          for (const cart of addedProduct) {
            if (cart.id === id) {
              cart.quantity += 1;
              newCart.push(cart);
            } else {
              newCart.push(cart);
            }
          }
          setAddedProduct(newCart);
        }
        newCart.push(product);
      } else {
        newCart.push(product);
      }
    }
    setCartProducts(newCart);
  };

  // delete cart products
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete");
    if (confirm) {
      const remain = addedProduct.filter((cart) => cart.id !== id);
      const remainCartProduct = cartProducts.filter(
        (product) => product._id !== id
      );

      fetch(
        `https://iqbal.diaryofmind.com/cyclemart/users/carts/${user.email}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(remain),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            setAddedProduct(remain);
            setCartProducts(remainCartProduct);
            alert.show("Product deleted");
          }
        });
    }
  };
  let totalPrice = 0;

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner'></div>
      </div>
    );
  }
  return (
    <table className='my-5'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.length ? (
          <>
            {cartProducts.map((product) => {
              totalPrice += parseInt(product.price * product.quantity);
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      className='h-16'
                      src={product.productImg?.imgUrl}
                      alt=''
                    />
                  </td>
                  <td>
                    <p>{product.name}</p>
                  </td>
                  <td>
                    <p>{product.price * product.quantity} BDT</p>
                  </td>
                  <td className='flex gap-2 justify-center items-center'>
                    <div className='flex items-center'>
                      <button
                        onClick={() => {
                          handlePlusMinus(product._id, "minus");
                        }}
                        className='button'
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => {
                          handlePlusMinus(product._id, "plus");
                        }}
                        className='button'
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                      className='button'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              {cartProducts.length && (
                <>
                  <td>
                    <p>
                      Total:{" "}
                      <span className='font-medium text-secondary'>
                        {totalPrice} BDT
                      </span>
                    </p>
                  </td>
                  <td className='flex justify-center'>
                    <Link to={`/place-order/${allId}`}>
                      <button className='button'>Pleace Order</button>
                    </Link>
                  </td>
                </>
              )}
            </tr>
          </>
        ) : (
          <tr className='text-center py-8 text-gray-500'>
            <td colSpan={4}>
              <h1>There no product you added</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ViewCart;
