import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const PansySlider = () => {
  const [slidersImg, setSlidersImg] = useState([]);

  useEffect(() => {
    fetch("https://server.switchcafebd.com/cyclemart/sliders")
      .then((res) => res.json())
      .then((data) => setSlidersImg(data));
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {slidersImg.map((item) => (
          <div key={item._id}>
            <Link to={item.url.replace("https://cycle-mart-3ff64.web.app", "")}>
              <img src={item.imgUrl} alt='' />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PansySlider;
