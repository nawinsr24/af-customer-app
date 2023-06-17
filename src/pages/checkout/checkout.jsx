import React from 'react';

import BreadCrumb from '../../components/BreadCrumb';
import Checkout from '../../components/checkout/checkout';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

const CheckoutPage = () => {
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
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout />
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default CheckoutPage;
