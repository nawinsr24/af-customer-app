import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <p>Call us 24/7</p>
                <h3>1800 97 97 69</h3>
                <p>
                    502 New Design Str, Melbourne, Australia <br />
                    <a href="mailto:contact@martfury.co">contact@martfury.co</a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a className="facebook" href="/#">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a className="twitter" href="/#">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a className="google-plus" href="/#">
                            <i className="fa fa-google-plus"></i>
                        </a>
                    </li>
                    <li>
                        <a className="instagram" href="/#">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link to="/page/blank">
                        {/* <a>Policy</a> */}
                        Policy
                    </Link>
                </li>

                <li>
                    <Link to="/page/blank">
                        {/* <a>Term & Condition</a> */}
                        Term & Condition
                    </Link>
                </li>
                <li>
                    <Link to="/page/blank">
                        {/* <a>Shipping</a> */}
                        Shipping
                    </Link>
                </li>
                <li>
                    <Link to="/page/blank">
                        {/* <a>Return</a> */}
                        Return
                    </Link>
                </li>
                <li>
                    <Link to="/page/faqs">
                        {/* <a>FAQs</a> */}
                        FAQs
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link to="/page/about-us">
                        {/* <a>About Us</a> */}
                        About Us
                    </Link>
                </li>
                <li>
                    <Link to="/page/blank">
                        {/* <a>Affilate</a> */}
                        Affilate
                    </Link>
                </li>
                <li>
                    <Link to="/page/blank">
                        {/* <a>Career</a> */}
                        Career
                    </Link>
                </li>
                <li>
                    <Link to="/page/contact-us">
                        {/* <a>Contact</a> */}
                        Contact
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Bussiness</h4>
            <ul className="ps-list--link">
                <li>
                    <Link to="/page/about-us">
                        {/* <a>Our Press</a> */}
                        Our Press

                    </Link>
                </li>
                <li>
                    <Link to="/account/checkout">
                        {/* <a>Checkout</a> */}
                        Checkout
                    </Link>
                </li>
                <li>
                    <Link to="/account/user-information">
                        {/* <a>My account</a> */}
                        My account
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                        {/* <a>Shop</a> */}
                        Shop
                    </Link>
                </li>
            </ul>
        </aside>
    </div>
);

export default FooterWidgets;
