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
            <Link to="/account/shopping-cart">
                <div className="header__extra" >
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cartItems ? cartItems.length : 0}</i>
                    </span>
                </div>
            </Link>

            {auth?.isLoggedIn && Boolean(auth?.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (

                <Link to="/login">
                    <div className="header__extra" style={{marginLeft:"10px"}}>
                        <i className="icon-user"></i>
                    </div>
                </Link>

            )}
        </div>
    );
};

export default MobileHeaderActions;
