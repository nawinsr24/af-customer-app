import React from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { useAuthContext } from '../../../context/AuthContext';

const HeaderActions = ({ ecomerce, auth }) => {
    const { ctxtUser } = useAuthContext();
    // views
    let headerAuthView;
    if (ctxtUser?.token) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }


    return (
        <div className="header__actions">

            <MiniCart />
            {headerAuthView}
        </div>
    );
};

export default HeaderActions;
