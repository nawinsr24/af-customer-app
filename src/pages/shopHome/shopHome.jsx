import React from 'react';
import HomeDefaultBanner from '../../components/shopHome/HomeDefaultBanner';
import PageContainer from '../../components/layouts/PageContainer';
import HomeDefaultDealOfDay from '../../components/shopHome/dealOfTheDay/dealOfTheDay';
import HomeDefaultProductListing from '../../components/shopHome/homeProductListing/homeProductListing';
import ShopCategories from '../../components/shop/shopCategories';
import SiteFeatures from '../../components/siteFeatures/siteFeatures';
const ShopHomePage = () => {

    const stockType = [{ type: 'most_popular', title: "Most popular" }, { type: 'best_selling', title: "Best selling" }, { type: 'new_arrival', title: "New arrival" }];
    return (
        <PageContainer title="Home">
            <div className="ps-page--shop">
                <div className="ps-container">
                    <HomeDefaultBanner />
                    <ShopCategories />
                    <HomeDefaultDealOfDay />
                    {stockType.map((type) => {

                        return <HomeDefaultProductListing stock={type} title={type.title} />;
                    })}
                    {/* <ShopItems columns={6} pageSize={18} /> */}
                </div>
            </div>
            <SiteFeatures />
            {/* <Newletters /> */}
        </PageContainer>


    );
};
export default ShopHomePage;
