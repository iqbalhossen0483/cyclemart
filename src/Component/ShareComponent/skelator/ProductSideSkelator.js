import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSideSkelator = () => {
    return (
        <div className="bg-white w-full p-5">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
                className="mt-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={2}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2.5rem"
                className="mt-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="90%"
                count={3}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
                className="mr-14"
                inline={true}
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.6rem"
                width="30%"
            />
        </div>
    )
};

export default ProductSideSkelator;