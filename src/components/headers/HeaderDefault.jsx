import React, { useEffect } from 'react';
import SearchHeader from './modules/SearchHeader';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import { stickyHeader } from '../../utilities/common-helpers';

const HeaderDefault = () => {

    // useEffect(() => {
    //     if (process?.browser) {
    window.addEventListener('scroll', stickyHeader);
    //     }
    // }, []);

    return (
        <header
            className="header header--1"
            data-sticky="true"
            id="headerSticky">
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">

                        <a href='/' className="ps-logo" style={{
                            display: "flex",
                            height: "100%",
                            width: "40%",
                            filter: "drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2))"
                        }}>
                            <img src={'/static/amirtha-fashion-images/amirtha-log.png'} alt="" />
                        </a>

                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
            <NavigationDefault />
        </header>
    );
};

export default HeaderDefault;
