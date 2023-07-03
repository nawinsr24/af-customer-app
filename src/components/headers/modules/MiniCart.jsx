import React, { useEffect, useState } from 'react';
import ProductOnCart from '../../ProductOnCart';
import { calculateAmount } from '../../../utilities/ecomerce-helpers';
import { useAuthContext } from '../../../context/AuthContext';
import { getCart, deleteCart } from '../../../services/home-page-service';
import { notify } from '../../notify';

const MiniCart = ({ isRefresh }) => {
    console.log("isRefresh", isRefresh);
    const { ctxtUser } = useAuthContext();
    const [cartData, setCartData] = useState([]);
    const [cart2, setcart2] = useState();
    const getcartData = async () => {
        // setCartData([]);
        const cartResponse = await getCart(ctxtUser.userId);
        console.log("cartResponse", cartResponse);
        setCartData(cartResponse);
        setcart2(cartResponse);
        console.log(":cartData", cartData);
        console.log(":cartData2", cart2);
    }
    async function handleRemoveItem(cart) {
        await deleteCart(ctxtUser.userId, cart.cart_id);
        notify("success", `${cart.name} removed from cart`)
        getcartData();
    }

    useEffect(() => {
        getcartData();
    }, [isRefresh]);

    useEffect(() => {
        console.log("Updated cartData:", cartData);
    }, [cartData, isRefresh]);
    let cartItemsView;
    if (cartData && cartData.length > 0) {
        const amount = calculateAmount(cartData);
        const productItems = cartData.map((item) => {
            return (
                <ProductOnCart product={item} key={item.product_id}>
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
                        <strong>${amount ? amount : 0}</strong>
                    </h3>
                    <figure>
                        <a href='/shopping-cart"' className="ps-btn">View Cart</a>
                        <a href='/checkout' className="ps-btn">Checkout</a>
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
            <a className="header__extra" href="/#">
                <i className="icon-bag2"></i>
                <span>
                    <i>{cartData ? cartData.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};
// cartRefresh();

export default MiniCart;
