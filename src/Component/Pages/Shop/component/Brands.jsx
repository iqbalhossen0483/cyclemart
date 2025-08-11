import React from "react";

const Brands = ({ handleBrands, setBrands }) => {
  const brands = ["Hike", "Phoenix", "Bianchi"];
  return (
    <div className='lg:text-xl leading-8'>
      <h2 className='side-menu'>Brands</h2>
      <form>
        {brands.map((brand, i) => (
          <div key={i} className='flex items-center'>
            <input
              onClick={(e) => {
                handleBrands(e);
              }}
              type='checkbox'
              name={brand}
            />
            <p className='ml-2'>{brand}</p>
          </div>
        ))}
        <input
          type='reset'
          onClick={() => {
            setBrands("");
          }}
          className='button'
        />
      </form>
    </div>
  );
};

export default Brands;
