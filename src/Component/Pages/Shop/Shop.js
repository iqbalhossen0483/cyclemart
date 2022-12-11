import Product from "../../ShareComponent/prooduct/Product";
import Footer from "../../ShareComponent/Footer/Footer";
import React, { useEffect, useState } from "react";
import SideMenus from "./component/SideMenus";
import Spinner from "./component/Spinner";

const Shop = () => {
  const [randomProduct, setRandomProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [brands, setBrands] = useState("");
  const [type, setType] = useState("");
  const [minMax, setMinMax] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    let url =
      "https://myserver-production-ddf8.up.railway.app/cyclemart/products";
    if (brands) url += `?brand=${brands}`;
    else if (type) url += `?type=${type}`;
    else if (minMax.min !== minMax.max) {
      url += `?min=${minMax.min}&max=${minMax.max}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [brands, type, minMax]);

  const handleBrands = (e) => {
    if (brands) {
      if (!brands.includes(e.target.name)) {
        setBrands(brands + "|" + e.target.name);
      }
    } else setBrands(e.target.name);
  };

  const handleType = (e) => {
    if (type) {
      if (!type.includes(e.target.name)) {
        setType(type + "|" + e.target.name);
      }
    } else setType(e.target.name);
  };

  //get random product
  useEffect(() => {
    if (products.length) {
      const number = Math.floor(Math.random() * products.length - 1) + 1;
      fetch(
        `https://myserver-production-ddf8.up.railway.app/cyclemart/products/rendom/${number}`
      )
        .then((res) => res.json())
        .then((data) => setRandomProduct(data));
    }
  }, [products]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='shop-container'>
      <SideMenus
        handleBrands={handleBrands}
        setBrands={setBrands}
        products={products}
        setMinMax={setMinMax}
        handleType={handleType}
        setType={setType}
        randomProduct={randomProduct}
      />
      <div className='pt-10'>
        <div className='shop-product'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
