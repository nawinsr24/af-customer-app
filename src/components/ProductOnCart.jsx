import React from 'react';
import LazyLoad from 'react-lazyload';
import Constants from '../constants';


const ProductOnCart = ({ product, children }) => {
    // const { thumbnailImage, title } = useProduct();
    const title = (payload) => {
        let view = (
            <a href={`/product/${payload.product_id}`}>
                <a className="ps-product__title">{payload.name}</a>
            </a>
        );
        return view;
    }
    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <a href={`/product/${product.stock_id}`} >
                    <LazyLoad>
                        <img
                            src={`${Constants.imgUrl}${product?.images[0]?.image_url}`}
                            alt={`${Constants.imgUrl}${product?.images[0]?.image_url}`}
                        />
                    </LazyLoad>
                </a>

            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                        ${product.base_price} x {product.quantity || 1}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
