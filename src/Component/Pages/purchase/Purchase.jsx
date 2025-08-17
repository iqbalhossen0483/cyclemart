import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";
import useFirebase from "../../Hook/useFirebase";
import useFunc from "../../Hook/useFunc";
import Payment from "../Shop/Payment";

const Purchase = () => {
  const { setAddedProduct, addedProduct, customer } = useFunc();
  const [cashOnDelivary, setCashOnDelivary] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(null);
  const [singleProduct, setSingleProduct] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [orderDetails, setOderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { quantity } = useFirebase();
  const navigate = useNavigate();
  const { id } = useParams();
  let sipping = 100;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: customer.displayName,
      email: customer.email,
    },
  });

  console.log(customer);

  function handleSameAsBilling(e) {
    if (!e.target.checked) {
      setSameAsBilling(false);
    } else {
      setSameAsBilling(true);
    }
  }

  //find triger products
  useEffect(() => {
    if (id.startsWith("&&")) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          let totalPrice = 0;
          data.forEach((product) => {
            for (const cart of addedProduct) {
              if (product._id === cart.id) {
                return (product.quantity = cart.quantity);
              }
            }
          });
          //set total price for lifting up and show payment page
          data.forEach(
            (product) => (totalPrice += product.price * product.quantity)
          );
          setTotalPrice(totalPrice);

          setOrders(data);
          setIsLoading(false);
        });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTotalPrice(data.price * quantity);
          setSingleProduct([data]);
          setIsLoading(false);
        });
    }
  }, [id, addedProduct, quantity]);

  // post order
  function onSubmit(order) {
    setLoading(true);
    order.date = new Date().toLocaleDateString("en-us");
    order.status = "pending";
    order.name = customer.displayName;
    order.email = customer.email;

    //same as billing address
    if (sameAsBilling) {
      order.division = customer.division;
      order.district = customer.district;
      order.policeStation = customer.policeStation;
      order.rodeOrVillage = customer.rodeOrVillage;
      order.phone = customer.phone;
    }

    //single product was ordered
    if (singleProduct.length) {
      let newSingle = [];
      let price = 0;
      singleProduct.map((product) => {
        const single = product;
        single.quantity = quantity;
        price = product.price;
        return newSingle.push(single);
      });
      order.products = newSingle;
      order.totalBDT = quantity * price + sipping;
    }
    //maltiple products were ordered
    else {
      let newOrders = [];
      orders.map((product) => {
        const singleOrder = product;
        let OrderedProductQuantity = 1;
        for (const cart of addedProduct) {
          OrderedProductQuantity = cart.quantity;
        }
        singleOrder.quantity = OrderedProductQuantity;
        return newOrders.push(singleOrder);
      });
      order.products = newOrders;
      order.totalBDT = totalPrice + sipping;
    }
    //post order
    if (cashOnDelivary) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/orders`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Your order created successfully");
            reset();
            navigate("/");
            if (!singleProduct.length) {
              setAddedProduct([]);
              sessionStorage.removeItem("cart_product");
            }
          }
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      setOderDetails(order);
      setShowPayment(true);
    }
  }

  const handleCashOndelivary = (e) => {
    if (e.target.checked) {
      setCashOnDelivary(true);
    } else {
      setCashOnDelivary(false);
    }
  };
  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="px-3 md:px-5 grid grid-cols-1 md:grid-cols-2 gap-5 py-10 ">
      <div className="bg-white p-5 rounded-md">
        <h1 className="header">Order Summary</h1>
        {singleProduct.length ? (
          singleProduct.map((product) => {
            totalPrice > 25000
              ? (sipping = 250)
              : (sipping =
                  100 || totalPrice > 15000
                    ? (sipping = 200)
                    : (sipping =
                        100 || totalPrice > 10000
                          ? (sipping = 150)
                          : (sipping = 100)));
            return (
              <div key={product._id}>
                <div className="col-span-2 flex justify-center">
                  <img
                    className="w-36 h-32"
                    src={product.productImg?.imgUrl}
                    alt=""
                  />
                </div>
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th>
                        <p className="font-medium text-base">Product Name: </p>
                      </th>
                      <th>
                        <p className="font-medium text-base">{product.name}</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product Price:</td>
                      <td>{product.price}</td>
                    </tr>
                    <tr>
                      <td>Product Quantity:</td>
                      <td>{quantity}</td>
                    </tr>
                    <tr>
                      <td>Sub-total:</td>
                      <td>{totalPrice}</td>
                    </tr>
                    <tr>
                      <td>Shipping Cost:</td>
                      <td>{sipping}</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td className="text-secondary font-medium">
                        {totalPrice + sipping}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <div className="flex flex-wrap">
            {orders.map((product) => {
              totalPrice > 25000
                ? (sipping = 250)
                : (sipping =
                    100 || totalPrice > 15000
                      ? (sipping = 200)
                      : (sipping =
                          100 || totalPrice > 10000
                            ? (sipping = 150)
                            : (sipping = 100)));
              return (
                <div key={product._id}>
                  <img
                    className="h-20"
                    src={product.productImg?.imgUrl}
                    alt=""
                  />
                </div>
              );
            })}
            <table className="w-full border border-gray-300">
              <tbody>
                <tr>
                  <td>Sub-total:</td>
                  <td className="font-medium text-secondary">
                    {totalPrice} BDT
                  </td>
                </tr>
                <tr>
                  <td>Shipping Cost: </td>
                  <td className="font-medium text-red-400">{sipping} BDT</td>
                </tr>
                <tr>
                  <td>Total: </td>
                  <td className="font-medium text-secondary">
                    {totalPrice + sipping} BDT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="bg-white p-5 rounded-md">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="header">Shipping Address</h3>

          {customer?.district &&
            customer?.division &&
            customer?.policeStation &&
            customer?.rodeOrVillage &&
            customer?.phone && (
              <p className="flex items-center text-base mb-3">
                <input
                  onClick={(e) => {
                    handleSameAsBilling(e);
                  }}
                  className="mr-2 block"
                  type="checkbox"
                />
                Same as billing address
              </p>
            )}
          <input
            className="input"
            disabled
            {...register("name")}
            placeholder="Enter name"
          />
          <input
            type="email"
            disabled
            className="input"
            {...register("email")}
            placeholder="Enter email"
          />
          <input
            className="input"
            {...register("division", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.division : ""}
            placeholder="Enter division"
          />
          <input
            className="input"
            {...register("district", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.district : ""}
            placeholder="Enter district"
          />
          <input
            className="input"
            {...register("policeStation", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.policeStation : ""}
            placeholder="Enter police station"
          />
          <input
            className="input"
            {...register("rodeOrVillage", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.rodeOrVillage : ""}
            placeholder="Enter road name"
          />
          <input
            type="number"
            className="input"
            {...register("phone", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.phone : ""}
            placeholder="Enter your number"
          />
          <p className="flex items-center text-base">
            <input
              onClick={(e) => {
                handleCashOndelivary(e);
              }}
              className="mr-2"
              type="checkbox"
            />{" "}
            Cash on delivary
          </p>
          <div className="flex justify-center">
            {!cashOnDelivary ? (
              <input
                className="button w-auto text-center"
                type="submit"
                value="Procced to Pay"
              />
            ) : (
              <button
                disabled={loading}
                className="button w-auto text-center"
                type="submit"
              >
                {loading ? "Lading..." : "Place order"}
              </button>
            )}
          </div>
        </form>
      </div>
      {showPayment && (
        <div
          style={{ position: "absolute" }}
          className="h-full w-full bg-gray-100"
        >
          <div>
            <Payment totalPrice={totalPrice} orderDetails={orderDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
