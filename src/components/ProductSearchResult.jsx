import React from 'react';
import Rating from './Rating';
import LazyLoad from 'react-lazyload';
import Constants from '../constants';
const ProductSearchResult = ({ product }) => {
    // const { thumbnailImage, price, title } = useProduct();
    const price = (payload) => {
        let view;
        if (payload.total_price) {
            view = (
                <p className="ps-product__price sale">
                    <span>₹</span>
                    {payload.total_price}
                    <del className="ml-2">
                        <span>₹</span>
                        {payload.base_price}
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
                <a href={`product/${product.stock_id}`}>
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
                <a href={`product/${product.stock_id}`} className="ps-product__title">{product.name}</a>
                <div className="ps-product__rating">
                    <Rating />
                    <span>{product.ratingCount}</span>
                </div>
                {price(product)}
            </div>
        </div >
    );
};
export default ProductSearchResult;
