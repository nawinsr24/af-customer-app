import React from 'react';
import LazyLoad from 'react-lazyload';
// import Link from 'next/link';
import ModuleProductWideActions from './productWideAction';
import { useNavigate } from 'react-router-dom';
import Constants from '../../../../constants';
// import useProduct from '~/hooks/useProduct';

const ProductWide = ({ product }) => {
    const Router = useNavigate();
    return (
        <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">

                <a onClick={() => Router(`/product/${product.stock_id}`)}>{
                    <LazyLoad>
                        <img
                            src={`${Constants.imgUrl}${product?.images?.length && product.images[0].image_url}`}
                            alt={`${Constants.imgUrl}${product?.images?.length && product.images[0].image_url}`}
                        />
                    </LazyLoad>}</a>

            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    <a onClick={() => Router(`/procuct/${product.stock_id}`)} className="ps-product__title">{product.title}</a>

                    <p className="ps-product__vendor">
                        Sold by:
                        <a onClick={() => Router(`/shop`)}>
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
