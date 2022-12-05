import React from 'react';

const SingleNews = ({ news }) => {
    const { imgUrl, title, description, date } = news;
    return (
        <div className="m-3 md:m-3 bg-white rounded-md pb-5 border">
            <img
                className="rounded-t-md"
                src={imgUrl}
                alt=""
            />
            <p className="text-2xl font-semibold my-3 text-center">
                {title}
            </p>
            <p className="px-3 text-xl">
                {description.length > 100 ?
                    description.slice(0, 100) + "..." :
                    description}
            </p>
            <p className=" px-3">
                Post on: {date}
            </p>
            <div className="flex justify-center">
                <button className="button">Learn more</button>
            </div>
        </div>
    );
};

export default SingleNews;