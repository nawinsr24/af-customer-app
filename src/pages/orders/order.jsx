import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import OrderDetails from '../../components/orders/orders';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';

const OrderPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Your Orders',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoice detail">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <OrderDetails />
                </div>
                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default OrderPage;
