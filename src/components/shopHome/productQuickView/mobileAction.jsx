import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    // const { addItem } = useEcomerce();
    const Router = useNavigate();
    const handleAddItemToCart = (e) => {
        e.preventDefault();
        // addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
        Router('/shopping-cart');
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        // addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
        Router('/checkout');
    };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Add to cart
            </a>
            <a className="ps-btn" href="#" onClick={(e) => handleBuyNow(e)}>
                Buy Now
            </a>
        </div>
    );
};

export default ModuleDetailActionsMobile;
