import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { addToCart } from '../../../services/home-page-service';
import { notify } from '../../notify';
const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    const Router = useNavigate();
    const { ctxtUser } = useAuthContext();
    const handleAddItemToCart = async (data) => {
        await addToCart(ctxtUser.userId, data);
        notify("success", `${data.name} added to your cart`)
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
                onClick={(e) => handleAddItemToCart(product)}>
                Add to cart
            </a>
            <a className="ps-btn" href="#" onClick={(e) => handleBuyNow(e)}>
                Buy Now
            </a>
        </div>
    );
};

export default ModuleDetailActionsMobile;
