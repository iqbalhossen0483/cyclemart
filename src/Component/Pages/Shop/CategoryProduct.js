import Product from "../../ShareComponent/prooduct/Product";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CategoryProduct = () => {
  const [isProduct, setIsProduct] = useState(true);
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/cyclemart/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setIsProduct(false);
        }
      });
  }, [category]);

  return (
    <>
      {!isProduct ? (
        <div className='md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-5 md:m-10'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='text-3xl h-full flex justify-center items-center'>
          <p>There is no product</p>
        </div>
      )}
    </>
  );
};

export default CategoryProduct;
