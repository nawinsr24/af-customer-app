import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import FooterDefault from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
import ProductDeliveryDetails from '../../components/orders/order-history/productDeliveryDetails';

const ProductDeliveryHistoryPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Delivery Details',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Invoice detail">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ProductDeliveryDetails />
                </div>
                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default ProductDeliveryHistoryPage;
