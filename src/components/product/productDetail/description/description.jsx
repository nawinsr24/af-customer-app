import React from 'react';

import { Tabs } from 'antd';
import PartialDescription from './partialDescription';
import PartialSpecification from './partialSpecification';
import PartialReview from './partialReview';

const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
    return (
        <div className="ps-product__content ps-tab-root">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Description" key="1">
                    <PartialDescription product={product} />
                </TabPane>
                {/* <TabPane tab="Specification" key="2">
                    <PartialSpecification />
                </TabPane> */}
                {/* <TabPane tab="Vendor" key="3">
                    <PartialVendor />
                </TabPane> */}
                {/* <TabPane tab="Reviews (1)" key="4">
                    <PartialReview />
                </TabPane> */}
                {/* <TabPane tab="Questions and Answers" key="5">
                    Content of Tab Pane 3
                </TabPane> */}
                {/* <TabPane tab="More Offers" key="6">
                    <PartialOffer />
                </TabPane> */}
            </Tabs>
        </div>
    );
};

export default DefaultDescription;
