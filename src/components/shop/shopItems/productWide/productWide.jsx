import React from 'react';
import LazyLoad from 'react-lazyload';
// import Link from 'next/link';
import ModuleProductWideActions from './productWideAction';
// import useProduct from '~/hooks/useProduct';

const ProductWide = ({ product }) => {
    return (
        <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">

                <a href={`/product/${product.id}`}>{
                    <LazyLoad>
                        <img
                            src={product.thumbnail.url}
                            alt={product.thumbnail.url}
                        />
                    </LazyLoad>}</a>

            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    <a href={`/product/${product.id}`} className="ps-product__title">{product.title}</a>

                    <p className="ps-product__vendor">
                        Sold by:
                        <a href="/shop">
                            <a>{product.vendor}</a>
                        </a>
                    </p>
                    <ul className="ps-product__desc">
                        <li>Unrestrained and portable active stereo speaker</li>
                        <li> Free from the confines of wires and chords</li>
                        <li> 20 hours of portable capabilities</li>
                        <li>
                            Double-ended Coil Cord with 3.5mm Stereo Plugs
                            Included
                        </li>
                        <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                    </ul>
                </div>
                <ModuleProductWideActions product={product} />
            </div>
        </div>
    );
};

export default ProductWide;
