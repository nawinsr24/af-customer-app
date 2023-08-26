import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';

import ModulePaymentOrderSummary from '../../components/payment/paymentOrderSummary';
import { useNavigate } from 'react-router-dom';

const PaymentFailedPage = () => {
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
                                <h1>Payment Failed</h1>
                                <section class="c-container">

                                    {/* <div class="o-circle c-container__circle o-circle__sign--success">
                                        <div class="o-circle__sign"></div>
                                    </div> */}

                                    <div class="o-circle c-container__circle o-circle__sign--failure">
                                        <div class="o-circle__sign"></div>
                                    </div>

                                </section>
                            </div>
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                        <div className="ps-block--payment-success">
                                            <div className="ps-block__content">
                                                <h3>
                                                    Your payment process is failed !
                                                </h3>
                                                {/* <p>
                                                    Your order number is{' '}
                                                    <strong>123</strong>
                                                </p> */}
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

                                                <a onClick={() => Router('/shop')} className="ps-btn">
                                                    <i className="icon-arrow-left mr-2"></i>
                                                    Back to shop
                                                </a>

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

export default PaymentFailedPage;
