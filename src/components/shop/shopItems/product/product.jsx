import React from 'react';
import LazyLoad from 'react-lazyload';
import ProductActions from '../productAction/productAction';
import Rating from '../../../Rating';
import Constants from '../../../../constants';

const Product = ({ product }) => {
    const price = (payload) => {
        let view;
        if (payload.total_price) {
            view = (
                <p className="ps-product__price sale">
                    <span>₹</span>
                    {payload.base_price}
                    <del className="ml-2">
                        <span>₹</span>
                        {payload.total_price}
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

    const badge = (payload) => {
        let view;
        if (payload.badge && payload.badge !== null) {
            view = payload.badge.map((badge) => {
                if (badge.type === 'sale') {
                    return (
                        <div className="ps-product__badge">
                            {badge.value}
                        </div>
                    );
                } else if (badge.type === 'outStock') {
                    return (
                        <div className="ps-product__badge out-stock">
                            {badge.value}
                        </div>
                    );
                } else {
                    return (
                        <div className="ps-product__badge hot">
                            {badge.value}
                        </div>
                    );
                }
            });
        }
        if (payload.sale_price) {
            const discountPercent = (
                ((payload.price - payload.sale_price) /
                    payload.sale_price) *
                100
            ).toFixed(0);
            return (
                <div className="ps-product__badge">-{discountPercent}%</div>
            );
        }
        return view;
    }

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <a href={`/product/${product.product_id}`} >
                    <LazyLoad>
                        <img
                            src={`${Constants.imgUrl}${product?.images[0]?.image_url}`}
                            alt={product?.images[0]?.image_url}
                        />
                    </LazyLoad>
                </a>
                {badge(product)}
                <ProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <a className="ps-product__vendor" href="/shop">
                    Young Shop
                </a>
                <div className="ps-product__content">
                    {<a className="ps-product__title" href={`/product/${product.product_id}`}>
                        {product.name}
                    </a>}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {<a className="ps-product__title" href={`/product/${product.product_id}`}>
                        {product.name}
                    </a>}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
