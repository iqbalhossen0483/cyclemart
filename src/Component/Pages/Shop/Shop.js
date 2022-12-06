import Product from "../../ShareComponent/prooduct/Product";
import Footer from "../../ShareComponent/Footer/Footer";
import React, { useEffect, useState } from "react";
import SideMenus from "./component/SideMenus";
import Spinner from "./component/Spinner";

const Shop = () => {
  const [randomProduct, setRandomProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [seller, setSeller] = useState("");
  const [type, setType] = useState("");
  const [minMax, setMinMax] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    if (seller) {
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/brand/${seller}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        });
    } else if (type) {
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/type/${type}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        });
    } else {
      fetch("https://iqbal.diaryofmind.com/cyclemart/products")
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        });
    }
  }, [seller, type]);

  useEffect(() => {
    if (products.length) {
      let min = products[0].price,
        max = 0;
      products.forEach((item) => {
        if (item.price > max) {
          max = item.price;
        } else if (item.price < min) {
          min = item.price;
        }
      });
      const minmaxValue = minMax;
      minmaxValue.min = min;
      minmaxValue.max = max;
      setMinMax(minmaxValue);
    }
  }, [products, minMax]);

  const handleSellers = (e) => {
    if (seller) {
      if (!seller.includes(e.target.name)) {
        setSeller(seller + "&&" + e.target.name);
      }
    } else setSeller(e.target.name);
  };

  const handleType = (e) => {
    if (type) {
      if (!type.includes(e.target.name)) {
        setType(type + "&&" + e.target.name);
      }
    } else setType(e.target.name);
  };

  //get random product
  useEffect(() => {
    if (products.length) {
      const number = Math.floor(Math.random() * products.length - 1) + 1;
      fetch(`https://iqbal.diaryofmind.com/cyclemart/products/rendom/${number}`)
        .then((res) => res.json())
        .then((data) => setRandomProduct(data));
    }
  }, [products]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='md:pl-2 lg:px-2 md:flex gap-5'>
      <SideMenus
        handleSellers={handleSellers}
        setSeller={setSeller}
        minMax={minMax}
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
