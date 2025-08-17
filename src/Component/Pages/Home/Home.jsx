import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useFirebase from "../../Hook/useFirebase";
import Product from "../../ShareComponent/prooduct/Product";
import ProductSkelator from "../../ShareComponent/skelator/ProductSkelator";
import BannerSlider from "./BannerSlider";
import Menus from "./Menus";
import NewsCarusal from "./NewsCarusal";
import ReviewCarusal from "./ReviewCarousal";

const Home = () => {
  const [productLoading, setProductLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [products, setProduct] = useState([]);
  const { setHideUserInfo } = useFirebase();
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products/home`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setProductLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setReviewLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/offers`)
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setHideUserInfo(false);
        }}
      >
        {/* banner */}
        <div className="banner">
          <div className="hidden lg:block bg-white h-full">
            <Menus />
          </div>
          <div className="col-span-3 bg-white h-full">
            <BannerSlider />
          </div>
        </div>

        {/* flesh cart */}
        <div className="flesh-cart">
          {offers.map((item) => (
            <div key={item._id}>
              <Link
                to={item.url.replace("https://cycle-mart-3ff64.web.app", "")}
              >
                <p className="item">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* product */}
        <div className="mt-10">
          <h3 className="h1">Our Leatest Products</h3>
          <div className="product-container">
            {productLoading ? (
              <>
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
                <ProductSkelator />
              </>
            ) : (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
        </div>

        {/* reviews */}
        <div className="my-16 md:px-5">
          <h3 className="h1">Our Customer Reviews</h3>
          <ReviewCarusal setError={setError} />
        </div>

        {/* news */}
        <div className="my-16 md:px-5">
          <h3 className="h1">Leatest News</h3>
          <NewsCarusal setError={setError} />
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Home;
