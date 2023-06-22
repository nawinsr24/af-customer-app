import React, { useEffect } from 'react';
import SearchHeader from './modules/SearchHeader';
// import NavigationDefault from '../navigation/NavigationDefault';
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

                        <a href='/' className="ps-logo">
                            <img src={'static/img/logo_light.png'} alt="" />
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
            {/* <NavigationDefault /> */}
        </header>
    );
};

export default HeaderDefault;
