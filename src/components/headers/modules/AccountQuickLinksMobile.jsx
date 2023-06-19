import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
// import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu } from 'antd';
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = e => {
        e.preventDefault();
        // this.props.dispatch(logOut());
    };

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/user-information',
            },
            {
                text: 'Your Orders',
                url: '/orders',
            },
            {
                text: 'Order History',
                url: '/order-history',
            },
            {
                text: 'Invoices',
                url: '/invoices',
            },
            // {
            //     text: 'Address',
            //     url: '/account/addresses',
            // },
            // {
            //     text: 'Recent Viewed Product',
            //     url: '/account/recent-viewed-product',
            // },
            // {
            //     text: 'Wishlist',
            //     url: '/account/wishlist',
            // },
        ];
        const menu = (
            <Menu>
                {accountLinks.map(link => (
                    <Menu.Item key={link.url}>
                        <Link to={link.url}>
                            {/* <a> */}
                            {link.text}
                            {/* </a> */}
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a href="/#" onClick={this.handleLogout.bind(this)}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="bottomLeft">
                <a href="/#" className="header__extra ps-user--mobile">
                    <i className="icon-user"></i>
                </a>
            </Dropdown>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
export default AccountQuickLinks;
