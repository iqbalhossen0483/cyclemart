import React, { useEffect, useState } from "react";
import Loader from "../../ShareComponent/Loader";
import SingleNews from "./singleNews";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/cyclemart/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className='my-16 md:px-5'>
        <div className='news-container'>
          {news.map((singleNews) => (
            <SingleNews key={singleNews._id} news={singleNews} />
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
