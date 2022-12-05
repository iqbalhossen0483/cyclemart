import React from "react";
import ProductSideSkelator from "../../../ShareComponent/skelator/ProductSideSkelator";
import ProductSkelator from "../../../ShareComponent/skelator/ProductSkelator";

const Spinner = () => {
  return (
    <div className='lg:grid gap-5 grid-cols-4 mt-5'>
      <div className=''>
        <ProductSideSkelator />
      </div>
      <div className='col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <ProductSkelator />
        <ProductSkelator />
        <ProductSkelator />
        <ProductSkelator />
        <ProductSkelator />
        <ProductSkelator />
      </div>
    </div>
  );
};

export default Spinner;
