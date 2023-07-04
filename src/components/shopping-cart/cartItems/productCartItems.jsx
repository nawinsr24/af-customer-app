import React from 'react';
import LazyLoad from 'react-lazyload';
import Constants from '../../../constants';
const ProductCart = ({ product }) => {

    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">

                <a href={`/product/${product.stock_id}`}>
                    <>
                        <LazyLoad>
                            <img
                                src={`${Constants.imgUrl}${product.images[0].image_url}`}
                                alt={`${Constants.imgUrl}${product.images[0].image_url}`}
                            />
                        </LazyLoad>
                    </>
                </a>

            </div>
            <div className="ps-product__content">
                <a href={`/product/${product.stock_id}`}>
                    <a className="ps-product__title">{product.name}</a>
                </a>
            </div>
        </div>
    );
};

export default ProductCart;
