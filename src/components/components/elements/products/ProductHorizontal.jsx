import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import Rating from '../../elements/Rating';

const ProductHorizontal = ({ product }) => {
    // const { thumbnailImage, price, title } = useProduct();
    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link to="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{'thumbnailImage'}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {"Title"}
                <div className="ps-product__rating">
                    <Rating />
                </div>
                {"Price"}
            </div>
        </div>
    );
};

export default ProductHorizontal;
