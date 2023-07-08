import React, { useState } from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import Payment from '../../components/payment/payment';
// import { connect } from 'react-redux';

import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const Router = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // Access query parameters
    const stock_id = queryParams.get('id');
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
            url: stock_id ? `/checkout/?id=${stock_id}` : '/checkout',
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
