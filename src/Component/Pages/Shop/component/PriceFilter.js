import React, { useEffect, useRef, useState } from "react";

const PriceFilter = ({ setMinMax, products }) => {
  const [minMaxVal, setMinMaxVal] = useState(null);
  const min = useRef(null);
  const max = useRef(null);

  function submit(e) {
    e.preventDefault();
    const minValue = parseInt(min.current.value);
    const maxValue = parseInt(max.current.value);
    if (minValue > maxValue) return;
    setMinMax({ min: minValue, max: maxValue });
  }

  useEffect(() => {
    if (products.length && !minMaxVal) {
      let min = products[0].price,
        max = 0;
      products.forEach((item) => {
        if (item.price > max) {
          max = item.price;
        } else if (item.price < min) {
          min = item.price;
        }
      });
      setMinMaxVal([min, max]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  if (!minMaxVal) return null;
  return (
    <div className='mt-7 mb-16 lg:text-xl'>
      <h2 className='side-menu'>Price</h2>
      <form onSubmit={(e) => submit(e)} className='flex gap-x-5 mt-5 flex-wrap'>
        <input
          ref={min}
          className='reange-input'
          type='number'
          defaultValue={minMaxVal[0]}
        />
        <input
          ref={max}
          className='reange-input'
          type='number'
          defaultValue={minMaxVal[1]}
        />
        <div className='flex justify-center flex-shrink'>
          <button type='submit' className='button'>
            Filter
          </button>
          <button type='reset' className='button'>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceFilter;
