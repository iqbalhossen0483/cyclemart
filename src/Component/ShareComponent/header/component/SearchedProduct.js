import { Link } from 'react-router-dom';
import React from 'react'

const SearchedProduct = ({ searchedProduct }) => {
    return (
        <div className='searched-product-wrapper'>
            {searchedProduct?.length ?
                searchedProduct?.map(product => {
                    return (
                        <div key={product._id} className='searched-product'>
                            <img
                                className='w-10 h-10'
                                src={product.productImg.imgUrl} alt=""
                            />
                            <div className='col-span-3 text-left'>
                                <Link to={`/products/${product._id}`}>
                                    {product.name}
                                </Link>
                            </div>
                        </div>
                    )
                }) :
                <p className='py-2'>No product found</p>
            }
        </div>
    );
}

export default SearchedProduct