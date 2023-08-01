import React, { useEffect, useState } from 'react';
import Rating from '../../../Rating';
import LazyLoad from 'react-lazyload';
import { StrapiProductPriceExpanded } from '../../../../utilities/product-helper';
// import ModuleProductProgressbar from './productProgressBar';
import ModuleProductActions from '../../shopHomeProductAction';
import Constants from '../../../../constants';
import { useNavigate } from 'react-router-dom';
const ProductDealOfDay = ({ product }) => {
    const Router = useNavigate();

    // useEffect(() => {
    //     if (product?.discount_percentage) {
    //         const dis_price = parseFloat(product.base_price) - (parseFloat(product.base_price) * (parseFloat(product.discount_percentage) / 100));
    //         const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(product.gst_rate) / 100));
    //         product.original_base_price = product.base_price;
    //         product.base_price = final_price;
    //     }

    // }, [product]);

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
        if (payload.discount_percentage) {
            const discountPercent = (
                Number(payload.discount_percentage)
            ).toFixed(0);
            return (
                <div className="ps-product__badge">-{discountPercent}%</div>
            );
        }
        return view;
    };


    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <a style={{ cursor: "pointer", display: "flex", height: '22rem' }} onClick={() => {
                    Router(`/product/${product.product_id}/?s_id=${product.stock_id}`);

                }}>
                    <>
                        <LazyLoad>
                            <figure style={{ display: "flex", padding: '10px', justifyContent: "center" }}>
                                <img height={'80%'} width={"80%"}
                                    src={`${Constants.imgUrl}${product?.images?.length && product?.images[0]?.image_url}`}
                                    alt={`${Constants.imgUrl}${product?.images?.length && product?.images[0]?.image_url}`}
                                />
                            </figure>

                        </LazyLoad>
                    </>
                </a>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">

                <a className="ps-product__vendor" style={{ cursor: "pointer" }} onClick={() => Router(`/shop`)}>
                    {/* Young Shop */}
                </a>

                <div className="ps-product__content">
                    {StrapiProductPriceExpanded(product)}
                    {
                        <a className="ps-product__title" style={{ cursor: "pointer" }} onClick={() => Router(`/product/${product.product_id}/?s_id=${product.stock_id}`)}>{product.name}</a>
                    }
                    <div className="ps-product__rating">
                        {/* <Rating />
                        <span>{product.ratingCount || 5}</span> */}
                    </div>
                    {/* <ModuleProductProgressbar product={product} /> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDealOfDay;
