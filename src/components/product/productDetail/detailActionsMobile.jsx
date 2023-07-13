import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { addToCart } from '../../../services/home-page-service';
import { notify } from '../../notify';
import { CartContext } from '../../../context/cartContext';
const DetailActionsMobile = ({ product }) => {
    const { ctxtUser } = useAuthContext();
    const { addToCartContext } = useContext(CartContext);
    const Router = useNavigate();
    const handleAddItemToCart = async (data) => {
        if (ctxtUser?.userId) {
            const reqObj = [{
                user_id: ctxtUser?.userId,
                stock_id: data.stock_id,
                cart_quantity: 1
            }];
            const res = await addToCart(reqObj);
            addToCartContext(data);
            if (res?.success) {
                notify("success", `${data.name} added to your cart`);
            } else {
                notify("error", `Failed to add items to cart.`);
            }
        } else {

            notify("error", `Please log in to continue!`);

        }

    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        if (!!ctxtUser?.userId) {

            Router(`/checkout/?id=${product.stock_id}`);
        } else {
            notify("error", `Please log in to continue!`);
        }
    };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"

                onClick={(e) => handleAddItemToCart(product)}>
                Add to cart
            </a>
            <a className="ps-btn" onClick={(e) => handleBuyNow(e)}>
                Buy Now
            </a>
        </div>
    );
};

export default DetailActionsMobile;
