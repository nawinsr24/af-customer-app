import React from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import MiniCart from '../../../shared/headers/modules/MiniCart';
import AccountQuickLinks from '../../../shared/headers/modules/AccountQuickLinks';

const HeaderActions = ({ ecomerce, auth }) => {
    // const { compareItems, wishlistItems } = ecomerce;
    const { compareItems, wishlistItems } = { compareItems: [], wishlistItems: [] };//new 
    // views
    let headerAuthView;
    if (auth?.isLoggedIn && Boolean(auth?.isLoggedIn) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    return (
        <div className="header__actions">
            {/* <Link to="/account/compare"> */}
            <a className="header__extra" href='/account/compare'>
                <i className="icon-chart-bars"></i>
                <span>
                    <i>{compareItems ? compareItems.length : 0}</i>
                </span>
            </a>
            {/* </Link> */}
            {/* <Link to="/account/wishlist"> */}
            <a className="header__extra" href='account/wishlist'>
                <i className="icon-heart"></i>
                <span>
                    <i>{wishlistItems ? wishlistItems.length : 0}</i>
                </span>
            </a>
            {/* </Link> */}
            <MiniCart />
            {headerAuthView}
        </div>
    );
};

export default HeaderActions;
