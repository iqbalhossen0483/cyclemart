import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import useFirebase from "../../Hook/useFirebase";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import useFunc from "../../Hook/useFunc";
import Payment from "../Shop/Payment";

const Purchase = () => {
  const { setAddedProduct, addedProduct, customer } = useFunc();
  const [cashOnDelivary, setCashOnDelivary] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(null);
  const [singleProduct, setSingleProduct] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [orderDetails, setOderDetails] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  const { quantity } = useFirebase();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  let sipping = 100;

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
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/${id}`)
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
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/${id}`)
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
      fetch("https://iqbal.diaryofmind.com/cyclemart/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert.show("Your order created successfully");
            reset();
            navigate("/");
            if (!singleProduct.length) {
              setAddedProduct([]);
            }
          }
        });
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
      <div className='spinner-container'>
        <div className='spinner'></div>
      </div>
    );
  }
  return (
    <div className='px-3 md:px-0 md:grid grid-cols-2'>
      <div className='container lg:w-4/6'>
        <h1 className='header'>Order Summary</h1>
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
              <div className='grid grid-cols-2 text-xl' key={product._id}>
                <div className='col-span-2 flex justify-center'>
                  <img
                    className='w-36 h-32'
                    src={product.productImg?.imgUrl}
                    alt=''
                  />
                </div>
                <div>
                  <p className='text-2xl font-semibold'>Product Name: </p>
                  <hr className='mb-3 mt-1' />
                  <p>Product Price:</p>
                  <p>Product Quantity:</p>
                  <p>Sub-total: </p>
                  <p>Shipping Cost:</p>
                  <hr className='mt-2' />
                  <p>Total:</p>
                </div>
                <div>
                  <p className='text-2xl font-semibold'>{product.name}</p>
                  <hr className='mb-3 mt-1' />
                  <p>{product.price}</p>
                  <p>{quantity}</p>
                  <p>{totalPrice} BDT</p>
                  <p>{sipping} BDT</p>
                  <hr className='mt-2' />
                  <p>{totalPrice + sipping} BDT</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className='flex flex-wrap'>
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
                    className='w-32 h-32'
                    src={product.productImg?.imgUrl}
                    alt=''
                  />
                </div>
              );
            })}
            <div className='grid grid-cols-2 mt-5 text-xl font-semibold leading-10'>
              <div>
                <p>Sub-total: </p>
                <p>Shipping Cost: </p>
                <hr className='mt-3' />
                <p>Total: </p>
              </div>
              <div className='text-green-500'>
                <p>{totalPrice} BDT</p>
                <p>{sipping} BDT</p>
                <hr className='mt-3' />
                <p>{totalPrice + sipping} BDT</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <form className='container lg:w-4/6' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='header'>Shipping Address</h3>

          {customer?.district &&
            customer?.division &&
            customer?.policeStation &&
            customer?.rodeOrVillage &&
            customer?.phone && (
              <p className='flex items-center text-xl mb-3'>
                <input
                  onClick={(e) => {
                    handleSameAsBilling(e);
                  }}
                  className='mr-2'
                  type='checkbox'
                />
                Same as billing address
              </p>
            )}
          <input
            className='input'
            disabled
            {...register("name")}
            placeholder='Enter name'
            defaultValue={customer.displayName}
          />
          <input
            type='email'
            disabled
            className='input'
            {...register("email")}
            defaultValue={customer.email}
            placeholder='Enter email'
          />
          <input
            className='input'
            {...register("division", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.division : ""}
            placeholder='Enter division'
          />
          <input
            className='input'
            {...register("district", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.district : ""}
            placeholder='Enter district'
          />
          <input
            className='input'
            {...register("policeStation", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.policeStation : ""}
            placeholder='Enter police station'
          />
          <input
            className='input'
            {...register("rodeOrVillage", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.rodeOrVillage : ""}
            placeholder='Enter road name'
          />
          <input
            type='number'
            className='input'
            {...register("phone", { required: !sameAsBilling })}
            defaultValue={sameAsBilling ? customer?.phone : ""}
            placeholder='Enter your number'
          />
          <p className='flex items-center text-xl'>
            <input
              onClick={(e) => {
                handleCashOndelivary(e);
              }}
              className='mr-2'
              type='checkbox'
            />{" "}
            Cash on delivary
          </p>
          <div className='flex justify-center'>
            {!cashOnDelivary ? (
              <input
                className='button w-auto text-center'
                type='submit'
                value='Procced to Pay'
              />
            ) : (
              <input
                className='button w-auto text-center'
                type='submit'
                value='Place order'
              />
            )}
          </div>
        </form>
      </div>
      {showPayment && (
        <div
          style={{ position: "absolute" }}
          className='h-full w-full bg-gray-100'
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
