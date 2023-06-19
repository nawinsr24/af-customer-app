import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
import OrderTrakingDetails from '../../components/orders/order-traking/orderTraking';

const OrderTrakingPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Traking',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoice detail">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <OrderTrakingDetails />
                </div>
                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default OrderTrakingPage;
