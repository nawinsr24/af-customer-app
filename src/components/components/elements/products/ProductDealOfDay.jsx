import React from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
// import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import ModuleProductActions from '../../elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '../../elements/products/modules/ModuleProductProgressbar';
// import useProduct from '~/hooks/useProduct';

const ProductDealOfDay = ({ product }) => {
    // const { thumbnailImage, badge, title } = useProduct();
    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{'thumbnailImage'}</a>
                </Link>
                {'badge'}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>
                <div className="ps-product__content">
                    {'Product'}
                    {'Titile'}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount}</span>
                    </div>
                    <ModuleProductProgressbar product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDealOfDay;
