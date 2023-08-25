import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { addToCart } from '../../../services/home-page-service';
import { notify } from '../../notify';
import { CartContext } from '../../../context/cartContext';
const ActionsSidebar = ({ product }) => {
    const Router = useNavigate();
    const [cart_quantity, setQuantity] = useState(1);
    const { ctxtUser } = useAuthContext();
    const { addToCartContext } = useContext(CartContext);
    async function handleAddItemToCart(data) {
        if (ctxtUser?.userId) {
            const reqObj = [{
                user_id: ctxtUser?.userId,
                stock_id: data.stock_id,
                cart_quantity
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
    async function handleBuyItem(data) {
        try {
            console.log("BUG");
            if (!!ctxtUser?.userId) {
                const reqObj = [{
                    user_id: ctxtUser?.userId,
                    stock_id: data.stock_id,
                    cart_quantity
                }];
                const res = await addToCart(reqObj);
                addToCartContext(data);
                Router(`/checkout/?id=${data.stock_id}`);
            } else {
                notify("error", `Please log in to continue!`);
            }
        } catch (error) {

        }

    }

    function handleAddItemToCompare(e) {
        e.preventDefault();

        // addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update();
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

    function handleIncreaseItemQty(e) {
        e.preventDefault();
        setQuantity(cart_quantity + 1);
    }

    function handleDecreaseItemQty(e) {
        e.preventDefault();
        if (cart_quantity > 1) {
            setQuantity(cart_quantity - 1);
        }
    }

    return (
        <div className="ps-product__shopping">
            <figure>
                <figcaption>Quantity</figcaption>
                <div className="form-group--number">
                    <button
                        className="up"
                        onClick={(e) => handleIncreaseItemQty(e)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button
                        className="down"
                        onClick={(e) => handleDecreaseItemQty(e)}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={cart_quantity}
                        disabled
                    />
                </div>
            </figure>
            <a
                className="ps-btn ps-btn--black"
                onClick={(e) => handleAddItemToCart(product)}>
                Add to cart
            </a>
            {/* <div className="ps-block__footer">
                <button className="ps-btn">Continue to shipping</button>
            </div> */}
            <button
                className="ps-btn"
                onClick={(e) => handleBuyItem(product)}>
                Buy Now
            </button>
            {/* <div className="ps-product__actions">
                <a onClick={(e) => handleAddItemToWishlist(e)}>
                    <i className="icon-heart mr-1"></i>
                    Add to wishlist
                </a>
                <a onClick={(e) => handleAddItemToCompare(e)}>
                    <i className="icon-chart-bars mr-1"></i>
                    Compare
                </a>
            </div> */}
        </div>
    );
};

export default ActionsSidebar;
