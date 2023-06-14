import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import Rating from './Rating';
// import useProduct from '~/hooks/useProduct';

const ProductSearchResult = ({ product }) => {
    // const { thumbnailImage, price, title } = useProduct();

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                {/* <Link to="/product/[pid]" as={`/product/${product.id}`}> */}
                <a href='product/[pid]'>{'thumbnailImage'}</a>
                {/* </Link> */}
            </div>
            <div className="ps-product__content">
                {'title'}
                <div className="ps-product__rating">
                    <Rating />
                    <span>{product.ratingCount}</span>
                </div>
                {'price'}
            </div>
        </div>
    );
};
export default ProductSearchResult;
