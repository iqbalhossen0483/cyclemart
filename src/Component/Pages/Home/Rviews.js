import React from 'react';
import Rating from 'react-rating';

const Rviews = (props) => {
    const { name, img, description, rating } = props.review;
    return (
        <div className="review-container">
            {img ?
                <img className="w-24 h-24 rounded-full mx-auto"
                    src={img}
                    alt=""
                /> :
                <i className="fas fa-user text-5xl mt-10"></i>
            }

            <p className="text-xl my-2">
                {name}
            </p>
            <p className="px-3">
                {description.length > 100 ?
                    description.slice(0, 100) + "..." :
                    description}
            </p>
            <Rating
                className="text-yellow-400 text-xs mt-2"
                readonly
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
                initialRating={rating}
            />
        </div>
    );
};

export default Rviews;