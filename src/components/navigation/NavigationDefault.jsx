import React, { Component } from 'react';
import { notification } from 'antd';
import Menu from '../navigation/MenuCategoriesDropdown/menu/Menu';

import menuData from '../../static/data/menu.json';
// import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
// import LanguageSwicher from '../headers/modules/LanguageSwicher';
import MenuCategoriesDropdown from './MenuCategoriesDropdown/MenuCategoriesDropdown';

class NavigationDefault extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <nav className="navigation">
                {/* <div className="ps-container">
                    <div className="navigation__left">
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="navigation__right">
                        <Menu
                            source={menuData.menuPrimary.menu_1}
                            className="menu"
                        />
                        <ul className="navigation__extra">
                            <li>
                                <a href="/vendor/become-a-vendor">
                                    <a>Sell on Martfury</a>
                                </a>
                            </li>
                            <li>
                                <a href="/account/order-tracking">
                                    <a>Tract your order</a>
                                </a>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div> */}
            </nav>
        );
    }
}

export default NavigationDefault;
