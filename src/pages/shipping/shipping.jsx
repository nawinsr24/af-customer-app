import React from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import Shipping from '../../components/shipping/shipping';
import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';
import { useLocation } from 'react-router-dom';
// import Newletters from '~/components/partials/commons/Newletters';

const ShippingPage = () => {
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
            url: '/soppin-cart',
        },
        {
            text: 'Checkout Information',
            url: stock_id ? `/checkout/?id=${stock_id}` : '/checkout',
        },
        {
            text: 'Shipping',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shipping">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Shipping />
                </div>
                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default ShippingPage;
