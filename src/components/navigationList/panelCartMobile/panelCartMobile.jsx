import React, { useEffect } from 'react';
import { calculateAmount } from '../../../utilities/ecomerce-helpers';
import LazyLoad from 'react-lazyload';

import data from '../../../static/data/product.json'

const PanelCartMobile = ({ ecomerce }) => {
    // const { products, getProducts, removeItem } = useEcomerce();
    // const { title, thumbnailImage } = useProduct();

    function handleRemoveCartItem(e, product) {
        e.preventDefault();
        // removeItem(product, ecomerce.cartItems, 'cart');
    }

    // useEffect(() => {
    //     if (ecomerce.cartItems) {
    //         getProducts(ecomerce.cartItems);
    //     }
    // }, [ecomerce]);
    //view
    let cartItemsView, footerView;

    let products = data.relatedProduct;

    if (products && products.length > 0) {
        const amount = calculateAmount(products);
        const items = products.map((item) => (
            <div className="ps-product--cart-mobile" key={item.id}>
                <div className="ps-product__thumbnail">
                    <>
                        <LazyLoad>
                            <img
                                src={products.thumbnail}
                                alt={products.thumbnail}
                            />
                        </LazyLoad>
                    </>
                </div>
                <div className="ps-product__content">
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveCartItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                    {<a href={`/product/${products.id}`} className="ps-product__title">{products.title}</a>
                    }

                    <a href={`/product/${item.id}`} className="ps-product__title">{item.title}</a>

                    <p>
                        <strong>Sold by:</strong> {item.vendor}
                    </p>
                    <small>
                        {item.quantity} x ${item.price}
                    </small>
                </div>
            </div>
        ));
        cartItemsView = <div className="ps-cart__items">{items}</div>;
        footerView = (
            <div className="ps-cart__footer">
                <h3>
                    Sub Total:<strong>${amount}</strong>
                </h3>
                <figure>

                    <a href="/shopping-cart" className="ps-btn">View Cart</a>


                    <a href="/checkout" className="ps-btn">Checkout</a>

                </figure>
            </div>
        );
    } else {
        cartItemsView = <p>Cart empty!</p>;
        footerView = (
            <div className="ps-cart__footer">
                <a href="/shop" className="ps-btn ps-btn--fullwidth">Shop now</a>
            </div>
        );
    }
    return (
        <div className="ps-cart--mobile">
            <div className="ps-cart__content">
                {cartItemsView}
                {footerView}
            </div>
        </div>
    );
};
export default PanelCartMobile;
