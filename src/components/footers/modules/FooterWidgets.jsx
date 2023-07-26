import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <p>Call us 24/7</p>
                <a href='tel:+91 86087 07354'><h3>+91 86087 07354</h3></a>
                <p>
                    No: 275, Pycrofts Road, Triplicane, Chennai - 600005
                    <br />
                    <a style={{ color: "#fcb800" }} href="mailto:info@amirthafashion.com">info@amirthafashion.com</a>
                </p>
                <p>
                    Connect with the Chief Customer Service Lead:
                    <br />
                    <a style={{ color: "#fcb800" }} href="mailto:renithkumar@amirthafashion.com">renithkumar@amirthafashion.com</a>
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
                    <Link to="/terms-and-conditions/?id=policy">
                        {/* <a>Policy</a> */}
                        Policy
                    </Link>
                </li>

                <li>
                    <Link to="/terms-and-conditions/?id=termsAndConditions">
                        {/* <a>Term & Condition</a> */}
                        Term & Condition
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions/?id=shipping">
                        {/* <a>Shipping</a> */}
                        Shipping
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions/?id=return">
                        {/* <a>Return</a> */}
                        Return
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions">
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
                    <Link to="/terms-and-conditions">
                        {/* <a>About Us</a> */}
                        About Us
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions">
                        {/* <a>Affilate</a> */}
                        Affilate
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions">
                        {/* <a>Career</a> */}
                        Career
                    </Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions">
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
                    <Link to="/terms-and-conditions">
                        {/* <a>Our Press</a> */}
                        Our Press

                    </Link>
                </li>
                <li>
                    <Link to="/checkout">
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
