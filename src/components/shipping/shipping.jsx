import React from 'react';
// import Link from 'next/link';
import ModulePaymentOrderSummary from '../../components/shipping/shippingPaymentOrderSummary';

const Shipping = () => {
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact</small>
                                        <p>test@gmail.com</p>

                                        <a href="/checkout">Change</a>

                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>2015 South Street, Midland, Texas</p>

                                        <a href="/checkout">Change</a>

                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>International Shipping</small>
                                        <strong>$20.00</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">

                                    <a href='/checkout'>
                                        <i className="icon-arrow-left mr-2"></i>
                                        Return to information
                                    </a>


                                    <a href='/payment' className="ps-btn">
                                        Continue to payment
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
