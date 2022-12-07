import ProductSkelator from "../../ShareComponent/skelator/ProductSkelator";
import ReviewSkelator from "../../ShareComponent/skelator/ReviewSkelator";
import NewsSkelator from "../../ShareComponent/skelator/NewsSkelator";
import React, { useEffect, useState } from "react";
import Product from "../../ShareComponent/prooduct/Product";
import useFirebase from "../../Hook/useFirebase";
import SingleNews from "../News/singleNews";
import { Link } from "react-router-dom";
import PansySlider from "./PansySlider";
import Massenger from "./Massenger";
import settings from "./sliderSetting";
import Slider from "react-slick";
import Reviews from "./Rviews";
import Menus from "./Menus";

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
    fetch("https://iqbal.diaryofmind.com/cyclemart/products/home")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setProductLoading(false);
      })
      .catch((err) => setError(err.massege));
  }, []);

  useEffect(() => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setReviewLoading(false);
      })
      .catch((err) => setError(err.massege));
  }, []);

  useEffect(() => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setNewsLoading(false);
      })
      .catch((err) => setError(err.massege));
  }, []);

  useEffect(() => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/offers")
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
        <div className='banner'>
          <div className='hidden lg:block bg-white h-full'>
            <Menus />
          </div>
          <div className='col-span-3 bg-white h-full'>
            <PansySlider />
          </div>
        </div>

        {/* flesh cart */}
        <div className='flesh-cart'>
          {offers.map((item) => (
            <div key={item._id}>
              <Link
                to={item.url.replace("https://cycle-mart-3ff64.web.app", "")}
              >
                <p className='item'>{item.name}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* product */}
        <div className='mt-10'>
          <h3 className='h1'>Our Leatest Products</h3>
          <div className='product-container'>
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
        <div className='my-16 md:px-5'>
          <h3 className='h1'>Our Customer Reviews</h3>
          {reviewLoading ? (
            <div className='grid grid-cols-3 gap-5'>
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
        <div className='my-16 md:px-5'>
          <h3 className='h1'>Leatest News</h3>
          {newsLoading ? (
            <div className='grid grid-cols-3 gap-5'>
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
        <Massenger />
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Home;
