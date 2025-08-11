import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductSkelator = () => {
    return (
        <div className="bg-white p-3 w-full">
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="9rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="2rem"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="70%"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="40%"
                inline={true}
                className="mr-10"
            />
            <Skeleton
                baseColor="#ddd3d352"
                highlightColor="#3f3b3b13"
                height="1.7rem"
                width="40%"
                inline={true}
            />
        </div>
    );
};

export default ProductSkelator;