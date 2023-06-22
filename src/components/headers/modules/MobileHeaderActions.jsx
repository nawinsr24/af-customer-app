import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import Link from 'next/link';
import { Link } from 'react-router-dom';

import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useAuthContext } from '../../../context/AuthContext';

const MobileHeaderActions = ({ auth, ecomerce }) => {
    // const { cartItems } = ecomerce;
    const { ctxtUser } = useAuthContext();
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

            {ctxtUser?.token ? (
                <AccountQuickLinksMobile />
            ) : (

                <Link to="/login">
                    <div className="header__extra" style={{ marginLeft: "10px" }}>
                        <i className="icon-user"></i>
                    </div>
                </Link>

            )}
        </div>
    );
};

export default MobileHeaderActions;
