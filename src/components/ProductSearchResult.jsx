import React from 'react';
import Rating from './Rating';
import LazyLoad from 'react-lazyload';
import Constants from '../constants';
import { useNavigate } from 'react-router-dom';
const ProductSearchResult = ({ product, callBackFn }) => {
    const Router = useNavigate();
    // const { thumbnailImage, price, title } = useProduct();
    const price = (payload) => {
        let view;
        if (payload.discount_percentage) {
            view = (
                <p className="ps-product__price sale">
                    <span>₹</span>
                    {payload.base_price}
                    <del className="ml-2">
                        <span>₹</span>
                        {payload.original_base_price}
                    </del>
                </p>
            );
        } else {
            view = (
                <p className="ps-product__price">
                    <span>₹</span>
                    {payload.base_price}
                </p>
            );
        }
        return view;
    };
    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                {/* <Link to="/product/[pid]" as={`/product/${product.id}`}> */}
                <a style={{ cursor: 'pointer' }} onClick={() => {
                    Router(`/product/${product.product_id}/?s_id=${product.stock_id}`);
                    callBackFn(false);
                }}>
                    <>
                        <LazyLoad>
                            <img
                                src={`${Constants.imgUrl}${product?.images?.length && product.images[0].image_url}`}
                                alt={`${Constants.imgUrl}${product?.images?.length && product.images[0].image_url}`}
                            />
                        </LazyLoad>
                    </></a>
                {/* </Link> */}
            </div>
            <div className="ps-product__content">
                <a style={{ cursor: 'pointer' }} onClick={() => {
                    Router(`/product/${product.product_id}/?s_id=${product.stock_id}`);
                    callBackFn(false);
                }} className="ps-product__title">{product.name}</a>
                <div className="ps-product__rating">
                    {/* <Rating />
                    <span>{product.ratingCount}</span> */}
                </div>
                {price(product)}
            </div>
        </div >
    );
};
export default ProductSearchResult;
