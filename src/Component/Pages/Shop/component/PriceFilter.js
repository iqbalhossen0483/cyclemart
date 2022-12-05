import MultiRangeInput from "../../../../utilitize/multiRangeInput/MultiRangeInput";
import React from "react";

const PriceFilter = ({ minMax, setMinMax }) => {
  return (
    <div className='mt-7 mb-16 lg:text-xl'>
      <h2 className='side-menu'>Price</h2>

      <MultiRangeInput
        min={parseInt(minMax.min)}
        max={parseInt(minMax.max)}
        onChange={({ min, max }) => setMinMax({ min, max })}
      />
    </div>
  );
};

export default PriceFilter;
