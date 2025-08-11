import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import useFirebase from "../../Hook/useFirebase";
import useFunc from "../../Hook/useFunc";

const ProductDetails = () => {
  const { quantity, setQuantity, user } = useFirebase();
  const [productImgUrl, setProductImgUrl] = useState("");
  const { addedProduct, setAddedProduct } = useFunc();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductImgUrl(data.productImg.imgUrl);
        setProduct(data);
        setQuantity(1);
        setIsLoading(false);
      })
      .catch((err) => toast.error(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { name, price, _id, stock, vendor, type, description, category } =
    product;

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCart = (id) => {
    if (user.email) {
      const notExist = addedProduct.find((cart) => cart.id === id);
      if (!notExist) {
        let cart = [];
        if (addedProduct.length === 0) {
          cart = [
            {
              id: id,
              quantity: quantity,
            },
          ];
        } else {
          cart = [
            ...addedProduct,
            {
              id: id,
              quantity: quantity,
            },
          ];
        }
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cyclemart/users/carts/${user.email}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(cart),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              setAddedProduct(cart);
              toast.success("Product added");
            }
          });
      } else {
        toast.info("already added");
      }
    } else {
      navigate("/log-in");
    }
  };

  function handleImg(imgUrl) {
    setProductImgUrl(imgUrl);
  }

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center flex-wrap bg-white gap-16 p-5">
        <div>
          <img className="h-52" src={productImgUrl} alt="" />
          <div className="flex justify-center gap-2">
            {product.imgGallery &&
              product.imgGallery.map((img) => (
                <img
                  key={img.imgId}
                  onClick={() => handleImg(img.imgUrl)}
                  className="h-16 border rounded"
                  src={img.imgUrl}
                  alt=""
                />
              ))}
          </div>
        </div>

        <div className="px-5 md:px-0 mt-8 flex flex-wrap gap-10">
          <div>
            <h1 className="text-xl font-medium mb-7">{name}</h1>
            <p>
              <span className="font-medium">Price:</span>{" "}
              <span className="text-secondary">BDT {price * quantity}</span>
            </p>
            <div className="product-color flex items-center my-3">
              <span className="font-medium"> Color: </span>
              <p className="bg-green-600"></p>
              <p className="bg-red-600"></p>
              <p className="bg-yellow-600"></p>
            </div>
            <p>
              <span className="font-medium">Vendor:</span> <span>{vendor}</span>
            </p>
            <p className="my-3">
              <span className="font-medium">Type:</span> <span>{type}</span>
            </p>
            <p className="my-3">
              <span className="font-medium">Category:</span>{" "}
              <span>{category}</span>
            </p>
            <p>
              <span className="font-medium">Availability:</span>
              <span className="text-secondary font-medium ml-2">
                {parseInt(stock) > 0 && parseInt(stock) > quantity ? (
                  "In stock!"
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center mt-3 leading-4">
              <span className="font-medium mr-2">Quantity:</span>
              <button
                onClick={handleMinus}
                className="border rounded px-2 py-1"
              >
                -
              </button>
              <span className="mx-3 text-lg font-medium">{quantity}</span>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className="border rounded px-2 py-1"
              >
                +
              </button>
            </div>
            <div className="flex justify-center md:justify-start leading-5 mt-4">
              <button
                onClick={() => {
                  handleCart(_id);
                }}
                className="button"
              >
                Add to cart
              </button>
              <Link to={`/place-order/${_id}`}>
                <button className="button">buy now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white md:w-3/4 p-5 mx-auto my-14 text-lg rounded-lg">
        <p className="font-medium mb-3">Product Details:</p>
        <p className="">{description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
