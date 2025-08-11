import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerSlider = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [slidersImg, setSlidersImg] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/sliders`)
      .then((res) => res.json())
      .then((data) => setSlidersImg(data));
  }, []);

  return (
    <div className="embla " ref={emblaRef}>
      <div className="embla__container">
        {slidersImg.map((item) => (
          <div className="embla__slide" key={item._id}>
            <Link to={item.url.replace("https://cycle-mart-3ff64.web.app", "")}>
              <img src={item.imgUrl} alt="" className="w-full h-96" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
