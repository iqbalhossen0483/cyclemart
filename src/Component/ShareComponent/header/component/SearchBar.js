import { DebounceInput } from "react-debounce-input";
import SearchedProduct from "./SearchedProduct";
import React, { useState } from "react";

const SearchBar = () => {
  const [showSearchProduct, setShowSearchProduct] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState([]);

  function handleSearchText(searchText) {
    const text = searchText;
    if (!text) return setShowSearchProduct(false);
    fetch(`http://localhost:5000/cyclemart/products/searchProduct/${text}`)
      .then((res) => res.json())
      .then((data) => {
        setShowSearchProduct(true);
        if (data.length) {
          setSearchedProduct(data);
        } else {
          setSearchedProduct([]);
        }
      });
  }

  return (
    <div className='col-span-2'>
      <div className=' w-full md:w-3/4 lg:ml-auto relative'>
        <DebounceInput
          type='text'
          className='input search-input'
          placeholder='Search Product...'
          minLength={3}
          debounceTimeout={500}
          onChange={(e) => handleSearchText(e.target.value)}
        />
        <i className='fa fa-search' aria-hidden='true' />
        {showSearchProduct && (
          <SearchedProduct searchedProduct={searchedProduct} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
