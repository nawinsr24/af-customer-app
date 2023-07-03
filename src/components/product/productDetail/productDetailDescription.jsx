import React from 'react';
// import Link from 'next/link';

const ProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
            Sold By:

            <a href="/shop">
                <strong> {product.vendor}</strong>
            </a>

        </p>
        <ul className="ps-list--dot">
            <li>{product.description}</li>
            <li>{product.description}</li>
            <li>{product.description}</li>
            <li>{product.description}</li>

        </ul>
    </div>
);

export default ProductDetailDescription;
