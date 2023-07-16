import React from 'react';
// import Link from 'next/link';
import Rating from '../../Rating';

const DetailTopInformation = ({ product }) => {
    // Views
    let priceView;

    if (product.total_price) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">&{product.total_price}</del>$
                {product.base_price}
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">${product.base_price}</h4>;
    }
    return (
        <header>
            <h1>{product.name}</h1>
            <div className="ps-product__meta">
                {/* <p>
                    Brand:

                    <a href="/shop" className="ml-2 text-capitalize">{product.vendor}</a>

                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div> */}
            </div>
            {priceView}
        </header>
    );
};

export default DetailTopInformation;
