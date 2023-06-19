import React, { Component } from 'react';

import FormChangeUserInformation from './formchangesUserInformation';

const UserInformation = () => {
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Your Orders',
            url: '/orders',
            icon: 'icon-store',
        },
        {
            text: 'Order History',
            url: '/order-history',
            icon: 'icon-history',
        },
        {
            text: 'Invoices',
            url: '/invoices',
            icon: 'icon-papers',
        },
        // {
        //     text: 'Address',
        //     url: '/addresses',
        //     icon: 'icon-map-marker',
        // },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        //     icon: 'icon-store',
        // },
        // {
        //     text: 'Wishlist',
        //     url: '/account/wishlist',
        //     icon: 'icon-heart',
        // },
    ];

    //Views
    const accountLinkView = accountLinks.map((item) => (
        <li key={item.text} className={item.active ? 'active' : ''}>
            <a href={item.url}>
                <i className={item.icon}></i>
                {item.text}
            </a>
        </li>
    ));

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>username@gmail.com</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <a href={link.url}>
                                                    <i
                                                        className={
                                                            link.icon
                                                        }></i>
                                                    {link.text}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <a href="/">
                                                <i className="icon-power-switch"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
