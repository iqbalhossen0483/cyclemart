import React from "react";

const SingleNews = ({ news }) => {
  const { imgUrl, title, description, date } = news;
  return (
    <div className='m-3 md:m-3 bg-white rounded pb-5 hover:shadow'>
      <img className='rounded-t-md' src={imgUrl} alt='' />
      <p className='px-3 font-medium my-3'>{title}</p>
      <p className='px-3 text-base'>
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </p>
      <p className=' px-3'>Post on: {date}</p>
      <div className='flex justify-center'>
        <button className='button'>Learn more</button>
      </div>
    </div>
  );
};

export default SingleNews;
