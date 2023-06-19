import React from 'react';
import LazyLoad from 'react-lazyload';

const OrderTrakingProductCart = ({ product }) => {
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">


                <a href={`/order-tracking/${product?.id}`}>
                    <LazyLoad>
                        <img
                            src={product.thumbnail}
                            alt={product.thumbnail}
                        />
                    </LazyLoad>
                </a>

            </div>
            <div className="ps-product__content">{
                <a href={`/order-tracking/${product.id}`} className="ps-product__title">{product.title}</a>
            }</div>
        </div>
    );
};

export default OrderTrakingProductCart;
