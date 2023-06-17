import React from 'react';
import LazyLoad from 'react-lazyload';
const ProductCart = ({ product }) => {

    const thumbnailImage = (payload) => {
        if (payload) {
            if (payload.thumbnail) {
                return (
                    <>
                        <LazyLoad>
                            <img
                                src={payload.thumbnail}
                                alt={payload.thumbnail}
                            />
                        </LazyLoad>
                    </>
                );
            }
        }
    }
    const title = (payload) => {
        let view = (
            <a href={`/product/${payload.id}`}>
                <a className="ps-product__title">{payload.title}</a>
            </a>
        );
        return view;
    }
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">

                <a href={`/product/${product.id}`}>{thumbnailImage({ thumbnail: product.thumbnail })}
                </a>

            </div>
            <div className="ps-product__content">{title({ title: product.title })}</div>
        </div>
    );
};

export default ProductCart;
