import React, { useContext, useEffect, useState } from 'react';
import ProductOnCart from '../../ProductOnCart';
import { calculateAmount } from '../../../utilities/ecomerce-helpers';
import { useAuthContext } from '../../../context/AuthContext';
import { getCart, deleteCart } from '../../../services/home-page-service';
import { notify } from '../../notify';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/cartContext';

const MiniCart = ({ }) => {
    const { contextCartItems } = useContext(CartContext);
    const Router = useNavigate();
    const { ctxtUser } = useAuthContext();
    const [cartData, setCartData] = useState([]);
    const getcartData = async () => {
        const cartResponse = await getCart(ctxtUser?.userId);
        cartResponse?.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            } else {
                pro.original_base_price = pro.base_price;
                pro.base_price = pro.total_price;
            }
        });
        setCartData(cartResponse);
    };
    async function handleRemoveItem(cart) {
        await deleteCart(ctxtUser?.userId, cart.cart_id);
        notify("success", `${cart.name} removed from cart`);
        getcartData();
    }

    useEffect(() => {
        getcartData();
    }, [contextCartItems]);

    let cartItemsView;
    if (cartData && cartData.length > 0) {
        const amount = calculateAmount(cartData);
        const productItems = cartData.map((item, i) => {
            return (
                <ProductOnCart product={item} key={`${item.product_id}+${i}`}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(item)}>
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>₹{amount ? amount : 0}</strong>
                    </h3>
                    <figure>
                        <a onClick={() => Router("/shopping-cart")} className="ps-btn">View Cart</a>
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>No products in cart</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" onClick={() => Router("/shopping-cart")}>
                <i className="icon-bag2"></i>
                <span>
                    <i>{cartData ? cartData.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default MiniCart;
