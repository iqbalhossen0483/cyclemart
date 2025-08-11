const SingleNews = ({ news }) => {
  const { imgUrl, title, description, date } = news;
  return (
    <div className="single-news m-3">
      <img className="rounded-t-md w-full h-32" src={imgUrl} alt="" />
      <p className="px-3 font-medium my-2">{title}</p>
      <p className="px-3 text-base text-justify text">{description}</p>
      <p className=" px-3 text-sm text-gray-500">post on: {date}</p>
      <button className="button absolute bottom-1 left-2/4 -translate-x-2/4">
        Learn more
      </button>
    </div>
  );
};

export default SingleNews;
