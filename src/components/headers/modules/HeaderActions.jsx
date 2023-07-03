import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { useAuthContext } from '../../../context/AuthContext';
import { getCart } from '../../../services/home-page-service';

const HeaderActions = ({ ecomerce, auth }) => {
    const { ctxtUser } = useAuthContext();
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const cartResponse = await getCart(ctxtUser.userId);
            setCartData(cartResponse);
        }
        getData();
    }, []);

    // views
    let headerAuthView;
    if (ctxtUser?.token) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }


    return (
        <div className="header__actions">

            <MiniCart cartProduct={cartData} />
            {headerAuthView}
        </div>
    );
};

export default HeaderActions;
