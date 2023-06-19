import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
import OrdersHistoryDetails from '../../components/orders/order-history/orderHistoryDetails';

const OrdersHistoryPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Orders History',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoice detail">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <OrdersHistoryDetails />
                </div>
                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default OrdersHistoryPage;
