import React from 'react';
import LazyLoad from 'react-lazyload';


const ProductOnCart = ({ product, children }) => {
    // const { thumbnailImage, title } = useProduct();
    const title = (payload) => {
        let view = (
            <a href={`/product/${payload.id}`}>
                <a className="ps-product__title">{payload.title}</a>
            </a>
        );
        return view;
    }
    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <a href={`/product/${product.id}`} >
                    <LazyLoad>
                        <img
                            src={product.thumbnail.url}
                            alt={product.thumbnail.url}
                        />
                    </LazyLoad>
                </a>

            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                        ${product.price} x {product.quantity || 1}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
