import React from 'react';
import Rating from '../../../Rating';
import LazyLoad from 'react-lazyload';
import { StrapiProductPriceExpanded } from '../../../../utilities/product-helper';
import ModuleProductProgressbar from './productProgressBar';
import ModuleProductActions from '../../shopHomeProductAction';
import Constants from '../../../../constants';
const ProductDealOfDay = ({ product }) => {
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
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <a href={`/product/${product.product_id}`}>
                    <>
                        <LazyLoad>
                            <img
                                src={`${Constants.imgUrl}${product?.images[0]?.image_url}`}
                                alt={`${Constants.imgUrl}${product?.images[0]?.image_url}`}
                            />
                        </LazyLoad>
                    </>
                </a>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">

                <a className="ps-product__vendor" href="/shop">Young Shop</a>

                <div className="ps-product__content">
                    {StrapiProductPriceExpanded(product)}
                    {
                        <a className="ps-product__title" href={`/product/${product.id}`}>{product.name}</a>
                    }
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount || 5}</span>
                    </div>
                    {/* <ModuleProductProgressbar product={product} /> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDealOfDay;
