import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';

import ModulePaymentOrderSummary from '../../components/payment/paymentOrderSummary';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const Router = useNavigate();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/shopping-cart',
        },
        {
            text: 'Payment Success',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <div>

                                    <h1>Order Placed</h1>

                                    {/* <div class="success-animation">
                                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div> */}
                                    <section class="c-container">

                                        <div class="o-circle c-container__circle o-circle__sign--success">
                                            <div class="o-circle__sign"></div>
                                        </div>

                                        {/* <div class="o-circle c-container__circle o-circle__sign--failure">
                                            <div class="o-circle__sign"></div>
                                        </div> */}

                                    </section>

                                </div>
                            </div>
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                        <div className="ps-block--payment-success">
                                            <div className="ps-block__content">
                                                <h3>
                                                    Thank you! Your order is
                                                    processing.
                                                </h3>
                                                <p>
                                                    {/* Your order number is{' '}
                                                    <strong>123</strong> */}
                                                </p>
                                                <p>
                                                    An email will be sent
                                                    containing information about
                                                    your purchase. If you have
                                                    any questions about your
                                                    purchase, email us at{' '}
                                                    <a
                                                        href="mailto@info@amirthafashion.com"
                                                        className="ps-highlight">
                                                        <strong>
                                                            info@amirthafashion.com
                                                        </strong>
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="ps-block__bottom">

                                                <button onClick={() => Router('/shop')} className="ps-btn">
                                                    <i className="icon-arrow-left mr-2"></i>
                                                    Back to shop
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                        <div className="ps-form__orders">
                                            {/* <ModulePaymentOrderSummary /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default PaymentSuccessPage;
