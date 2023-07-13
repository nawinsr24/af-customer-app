import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useAuthContext } from '../../../context/AuthContext';
import { notify } from '../../notify';
import { addToCart } from '../../../services/home-page-service';
import { CartContext } from '../../../context/cartContext';
const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const { ctxtUser } = useAuthContext();
    const { addToCartContext } = useContext(CartContext);

    const [cart_quantity, setQuantity] = useState(1);
    const Router = useNavigate();
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

    function handleBuynow(data) {
        if (!!ctxtUser?.userId) {
            Router(`/checkout/?id=${data.stock_id}`);
        } else {
            notify("error", `Please log in to continue!`);
        }
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update();
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update();
    };

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
    if (!extended) {
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
                <a className="ps-btn" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
                <div className="ps-product__actions">
                    <a onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i>
                    </a>
                    <a onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i>
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
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
                    {/* <div className="ps-product__actions">
                        <a onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a>
                        <a onClick={(e) => handleAddItemToCompare(e)}>
                            <i className="icon-chart-bars"></i>
                        </a>
                    </div> */}
                </div>
                <a className="ps-btn" onClick={(e) => handleBuynow(product)}>
                    Buy Now
                </a>
            </div>
        );
    }
};

export default ModuleDetailShoppingActions;
