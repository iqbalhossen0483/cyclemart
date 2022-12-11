import Product from "../../../ShareComponent/prooduct/Product";
import PriceFilter from "./PriceFilter";
import TypeFilter from "./TypeFilter";
import Brands from "./Brands";
import React from "react";

const SideMenus = (props) => {
  const {
    handleBrands,
    setBrands,
    products,
    handleType,
    setType,
    randomProduct,
    setMinMax,
  } = props;

  return (
    <div>
      <div className='sidebar scrollbar'>
        <Brands handleBrands={handleBrands} setBrands={setBrands} />
        <PriceFilter products={products} setMinMax={setMinMax} />
        <TypeFilter handleType={handleType} setType={setType} />

        <div className='hidden lg:block text-xl leading-8 mt-5'>
          <h2 className='side-menu'>Best Products</h2>
          {randomProduct.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenus;
