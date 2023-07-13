import React from 'react';
import LazyLoad from 'react-lazyload';
import ProductActions from '../productAction/productAction';
import Rating from '../../../Rating';
import Constants from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const Router = useNavigate();
    const price = (payload) => {
        let view;
        if (payload.total_price) {
            view = (
                <p style={{ display: "flex", flexWrap: "wrap", gap: "3px" }} className="ps-product__price sale">
                    <span>₹</span>
                    {payload.base_price}
                    <del>
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
    };

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <a style={{ cursor: "pointer", display: "flex", height: '22rem' }} onClick={() => Router(`/product/${product.stock_id}`)}>
                    <LazyLoad>
                        <figure style={{ display: "flex", padding: '10px', justifyContent: "center" }}>
                            <img height={'80%'} width={"80%"}
                                src={`${Constants.imgUrl}${product?.images?.length && product?.images[0]?.image_url}`}
                                alt={`${Constants.imgUrl}${product?.images?.length && product?.images[0]?.image_url}`}
                            />
                        </figure>

                    </LazyLoad>
                </a>
                {badge(product)}
                <ProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <a className="ps-product__vendor" style={{ cursor: "pointer" }} onClick={() => Router(`/shop`)}>
                    Young Shop
                </a>
                <div className="ps-product__content">
                    {<a className="ps-product__title" style={{ cursor: "pointer" }} onClick={() => Router(`/product/${product.stock_id}`)}>
                        {product.name}
                    </a>}
                    <div style={{ display: "flex" }} className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {<a className="ps-product__title" style={{ cursor: "pointer" }} onClick={() => Router(`/product/${product.stock_id}`)}>
                        {product.name}
                    </a>}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
