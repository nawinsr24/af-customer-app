import React from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';

const HeaderActions = ({ ecomerce, auth }) => {

    // views
    let headerAuthView;
    // if (auth?.isLoggedIn && Boolean(auth?.isLoggedIn) === true) {
    //     headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    // } else {
    //     headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    // }

    headerAuthView = <AccountQuickLinks isLoggedIn={true} />;


    return (
        <div className="header__actions">

            <MiniCart />
            {headerAuthView}
        </div>
    );
};

export default HeaderActions;
