import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ReviewSkelator = () => {
    return (
        <div className="bg-white p-3">
            <div className="flex justify-center">
                <Skeleton
                    baseColor="#ddd3d352"
                    highlightColor="#3f3b3b13"
                    circle={true}
                    width="4rem"
                    height="4rem"
                />
            </div>
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                width="50%"
                height="2rem"
                className="ml-24 my-3"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.4rem"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="60%"
                className="ml-16 mt-3"
            />
        </div>
    )
};

export default ReviewSkelator;