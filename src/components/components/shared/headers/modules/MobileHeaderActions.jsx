import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import Link from 'next/link';
import { Link } from 'react-router-dom';

import AccountQuickLinksMobile from './AccountQuickLinksMobile';

const MobileHeaderActions = ({ auth, ecomerce }) => {
    // const { cartItems } = ecomerce;
    const cartItems = []; //new     
    return (
        <div className="navigation__right">
            {/* <Link to="/account/shopping-cart"> */}
            <a className="header__extra" href="/account/shopping-cart">
                <i className="icon-bag2"></i>
                <span>
                    <i>{cartItems ? cartItems.length : 0}</i>
                </span>
            </a>
            {/* </Link> */}

            {auth?.isLoggedIn && Boolean(auth?.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <div className="header__extra">
                    <Link to="/account/login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MobileHeaderActions;
