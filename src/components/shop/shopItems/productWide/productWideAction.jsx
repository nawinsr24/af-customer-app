import React, { useContext } from 'react';
import { Modal } from 'antd';
import { useAuthContext } from '../../../../context/AuthContext';
import { addToCart } from '../../../../services/home-page-service';
import { notify } from '../../../notify';
import { CartContext } from '../../../../context/cartContext';
const ModuleProductWideActions = ({ ecomerce, product }) => {
    const { ctxtUser } = useAuthContext();
    const { addToCartContext } = useContext(CartContext);
    const price = (payload) => {
        let view;
        if (payload.total_price) {
            view = (
                <p className="ps-product__price sale">
                    <span>₹</span>
                    {payload.total_price}
                    <del className="ml-2">
                        <span>₹</span>
                        {payload.base_price}
                    </del>
                </p>
            );
        } else {
            view = (
                <p className="ps-product__price">
                    <span>₹</span>
                    {payload.base_price}
                </p>
            );
        }
        return view;
    };
    // const { price } = useProduct();
    // const { addItem } = useEcomerce();
    async function handleAddItemToCart(data) {
        if (ctxtUser?.userId) {
            const reqObj = [{
                user_id: ctxtUser?.userId,
                stock_id: data.stock_id,
                cart_quantity: 1
            }];
            const res = await addToCart(reqObj);
            addToCartContext(data);
            if (res.success) {
                notify("success", `${data.name} added to your cart`);
            } else {
                notify("error", `Failed to add items to cart.`);
            }
        } else {
            notify("error", `Please log in to continue!`);
        }

    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update();
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        });
        modal.update();
    }

    return (
        <div className="ps-product__shopping">
            {price(product)}
            <a
                className="ps-btn"
                onClick={(e) => handleAddItemToCart(product)}>
                Add to cart
            </a>
            {/* <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li>
            </ul> */}
        </div>
    );
};

export default ModuleProductWideActions;
