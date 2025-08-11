import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import useFirebase from "../../Hook/useFirebase";
import Product from "../../ShareComponent/prooduct/Product";
import NewsSkelator from "../../ShareComponent/skelator/NewsSkelator";
import ProductSkelator from "../../ShareComponent/skelator/ProductSkelator";
import ReviewSkelator from "../../ShareComponent/skelator/ReviewSkelator";
import SingleNews from "../News/singleNews";
import Menus from "./Menus";
import PansySlider from "./PansySlider";
import Reviews from "./Rviews";
import settings from "./sliderSetting";

const Home = () => {
  const [productLoading, setProductLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { setHideUserInfo } = useFirebase();
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products/home`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setProductLoading(false);
      })
      .catch((err) => setError(err.massege));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setReviewLoading(false);
      })
      .catch((err) => setError(err.massege));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setNewsLoading(false);
      })
      .catch((err) => setError(err.massege));
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
            <PansySlider />
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
          {reviewLoading ? (
            <div className="grid grid-cols-3 gap-5">
              <ReviewSkelator />
              <ReviewSkelator />
              <ReviewSkelator />
            </div>
          ) : (
            <Slider {...settings}>
              {reviews.map((review) => (
                <Reviews key={review._id} review={review} />
              ))}
            </Slider>
          )}
        </div>

        {/* news */}
        <div className="my-16 md:px-5">
          <h3 className="h1">Leatest News</h3>
          {newsLoading ? (
            <div className="grid grid-cols-3 gap-5">
              <NewsSkelator />
              <NewsSkelator />
              <NewsSkelator />
            </div>
          ) : (
            <Slider {...settings}>
              {news.map((singleNews) => (
                <SingleNews slider key={singleNews._id} news={singleNews} />
              ))}
            </Slider>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Home;
