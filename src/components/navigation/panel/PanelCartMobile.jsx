import React, { useContext, useEffect, useState } from 'react';
import { calculateAmount } from '../../../utilities/ecomerce-helpers';
import LazyLoad from 'react-lazyload';
import { useAuthContext } from '../../../context/AuthContext';
import { deleteCart, getCart } from '../../../services/home-page-service';
import Constants from '../../../constants';
import { notify } from '../../notify';
import { CartContext } from '../../../context/cartContext';
const PanelCartMobile = ({ reFresh }) => {
    const [cartProduct, setCartProduct] = useState([]);
    const { ctxtUser } = useAuthContext();
    const { removeFromCartContext } = useContext(CartContext);

    const getcartData = async () => {
        const cartResponse = await getCart(ctxtUser?.userId);
        setCartProduct(cartResponse);
    };

    async function handleRemoveCartItem(cart) {
        await deleteCart(ctxtUser?.userId, cart.cart_id);
        removeFromCartContext(cart);
        notify("success", `${cart.name} removed from cart`);
        getcartData();
    }

    useEffect(() => {
        getcartData();
    }, [reFresh]);
    //view
    let cartItemsView, footerView;

    if (cartProduct && cartProduct.length > 0) {
        const amount = calculateAmount(cartProduct);
        const items = cartProduct.map((item, i) => (
            <div className="ps-product--cart-mobile" key={`${item.id}+${i}`}>
                <div className="ps-product__thumbnail">

                    <a href={`/product/${item.stock_id}`}>{<>
                        <LazyLoad>
                            <img
                                src={`${Constants.imgUrl}${item?.images?.length && item.images[0].image_url}`}
                                alt={`${Constants.imgUrl}${item?.images?.length && item.images[0].image_url}`}
                            />
                        </LazyLoad>
                    </>}</a>

                </div>
                <div className="ps-product__content">
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveCartItem(item)}>
                        <i className="icon-cross"></i>
                    </a>
                    <a className="ps-product__title">{item.name}</a>

                    <a href={`/product/${item.stock_id}`} className="ps-product__title">{item.name}</a>

                    <p>
                        {/* <strong>Sold by:</strong> {item.vendor} */}
                    </p>
                    <small>
                        {item.cart_quantity || 1} x ₹{item.base_price}
                    </small>
                </div>
            </div>
        ));
        cartItemsView = <div className="ps-cart__items">{items}</div>;
        footerView = (
            <div className="ps-cart__footer">
                <h3>
                    Sub Total:<strong>₹{amount}</strong>
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
