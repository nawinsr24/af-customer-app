import React from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import Payment from '../../components/payment/payment';
// import { connect } from 'react-redux';

import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';

const PaymentPage = () => {
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
            text: 'Checkout Information',
            url: '/checkout',
        },
        {
            text: 'Payment',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Payment />
                </div>
            </PageContainer>
        </>
    );
};

export default PaymentPage;
