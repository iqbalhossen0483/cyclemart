import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useFunc from "../../../Hook/useFunc";

const CartProduct = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addedProduct } = useFunc();

  useEffect(() => {
    (async () => {
      try {
        const cartProduct = JSON.parse(sessionStorage.getItem("cart_product"));
        if (!cartProduct || cartProduct.count !== addedProduct.length) {
          let id = "";
          for (const cart of addedProduct) {
            id += "&&" + cart.id;
          }
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/cyclemart/products/${id}`
          );
          const data = await res.json();
          setCartProducts(data);
          sessionStorage.setItem(
            "cart_product",
            JSON.stringify({ count: addedProduct.length, data })
          );
        } else setCartProducts(cartProduct.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [addedProduct]);

  let totalPrice = 0;

  if (isLoading) {
    return (
      <p className="top-full absolute text-sm right-5 bg-white shadow-md z-20">
        Loading...
      </p>
    );
  }
  return (
    <div className="cart-product scrollbar">
      <table className="w-full">
        <tbody>
          {cartProducts.length &&
            cartProducts.map((product) => {
              totalPrice += parseInt(product.price);
              return (
                <tr key={product?._id}>
                  <td>
                    <img
                      className="h-14"
                      src={product.productImg?.imgUrl}
                      alt=""
                    />
                  </td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
          {cartProducts.length && (
            <tr>
              <td colSpan={2}>
                <p className="flex justify-end gap-1">
                  <span>Total:</span>
                  <span className="font-medium text-secondary">
                    {totalPrice}
                  </span>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="col-span-2 mt-3 flex justify-center">
        <Link to="/my-account/view-cart">
          <button className="button">View cart</button>
        </Link>
      </div>
    </div>
  );
};

export default CartProduct;
