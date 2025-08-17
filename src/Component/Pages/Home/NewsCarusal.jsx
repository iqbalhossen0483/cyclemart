import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import ReviewSkelator from "../../ShareComponent/skelator/ReviewSkelator";

const NewsCarusal = ({ setError }) => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplay.current]
  );

  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setNewsLoading(false);
      })
      .catch((err) => setError(err.message));
  }, [setError]);

  return (
    <>
      {newsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ReviewSkelator />
          <ReviewSkelator />
          <ReviewSkelator />
        </div>
      ) : (
        <div className="embla" ref={emblaRef}>
          <div className="flex">
            {news.map((singleNews) => {
              const { imgUrl, title, description, date, _id } = singleNews;
              return (
                <div
                  key={_id}
                  className="single-news flex-shrink-0 w-1/3 mr-5 relative"
                >
                  <img
                    className="rounded-t-md w-full h-32 object-cover"
                    src={imgUrl}
                    alt={title}
                  />
                  <p className="px-3 font-medium my-2">{title}</p>
                  <p
                    className="px-3 text-base text-justify"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {description}
                  </p>
                  <p className="px-3 text-sm text-gray-500">post on: {date}</p>
                  <button className="button absolute bottom-1 left-1/2 -translate-x-1/2">
                    Learn more
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCarusal;
