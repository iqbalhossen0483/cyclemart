import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const NewsSkelator = () => {
    return (
        <div className="bg-white p-3">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="13rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
                className="my-3"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.5rem"
                count={4}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
                width="40%"
                className="mt-3 ml-18"
            />
        </div>
    )
};

export default NewsSkelator;