import React, { useEffect, useState } from 'react';

import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useAuthContext } from '../../../context/AuthContext';
import { getCart } from '../../../services/home-page-service';
const MobileHeaderActions = ({ auth, ecomerce }) => {
    const { ctxtUser } = useAuthContext();
    const [cartData, setCartData] = useState([]);
    const getcartData = async () => {
        const cartResponse = await getCart(ctxtUser.userId);
        setCartData(cartResponse);
    }
    // async function handleRemoveItem(cart) {
    //     await deleteCart(ctxtUser.userId, cart.cart_id);
    //     notify("success", `${cart.name} removed from cart`)
    //     getcartData();
    // }
    useEffect(() => {
        getcartData();
    }, [])
    const cartItems = cartData;
    return (
        <div className="navigation__right">
            <a href="/shopping-cart">
                <div className="header__extra" >
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cartItems ? cartItems.length : 0}</i>
                    </span>
                </div>
            </a>

            {ctxtUser?.token ? (
                <AccountQuickLinksMobile />
            ) : (

                <a href="/login">
                    <div className="header__extra" style={{ marginLeft: "10px" }}>
                        <i className="icon-user"></i>
                    </div>
                </a>

            )}
        </div>
    );
};

export default MobileHeaderActions;
