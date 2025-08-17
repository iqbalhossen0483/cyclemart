import { useEffect, useState } from "react";

import useDebounce from "../../../../hooks/useDebouncer";
import SearchedProduct from "./SearchedProduct";

const SearchBar = () => {
  const [showSearchProduct, setShowSearchProduct] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  function handleSearchText(searchText) {
    const text = searchText;
    if (!text) return setShowSearchProduct(false);
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/cyclemart/products/searchProduct/${text}`
    )
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

  useEffect(() => {
    if (debouncedValue) {
      handleSearchText(debouncedValue);
    } else {
      setShowSearchProduct(false);
      setSearchedProduct([]);
    }
  }, [debouncedValue]);

  return (
    <div className="relative">
      <input
        type="text"
        className="input search-input"
        placeholder="Search Product..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <i className="fa fa-search" aria-hidden="true" />
      {showSearchProduct && (
        <SearchedProduct searchedProduct={searchedProduct} />
      )}
    </div>
  );
};

export default SearchBar;
