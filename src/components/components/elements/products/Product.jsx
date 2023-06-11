import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import ModuleProductActions from '../../elements/products/modules/ModuleProductActions';
// import useProduct from '~/hooks/useProduct';
import Rating from '../Rating';

const Product = ({ product }) => {
    // const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link to="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{'thumbnailImage'}</a>
                </Link>
                {'badge'}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link to="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>
                <div className="ps-product__content">
                    {'title'}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {'price'}
                </div>
                <div className="ps-product__content hover">
                    {'title'}
                    {'price'}
                </div>
            </div>
        </div>
    );
};

export default Product;
