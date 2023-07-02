import React from 'react';
import ShopBanner from '../../components/shopHome/shopBanner';
import PageContainer from '../../components/layouts/PageContainer';
import HomeDefaultDealOfDay from '../../components/shopHome/dealOfTheDay/dealOfTheDay';
import HomeDefaultProductListing from '../../components/shopHome/homeProductListing/homeProductListing';
const ShopHomePage = () => {

    const stockType = [{ type: 'most_popular', title: "Most popular" }, { type: 'best_selling', title: "Best selling" }, { type: 'new_arrival', title: "New arrival" }]
    return (
        <PageContainer title="Home">
            <div className="ps-page--shop">
                <div className="ps-container">
                    <ShopBanner />
                    <HomeDefaultDealOfDay />
                    {stockType.map((type) => {

                        return <HomeDefaultProductListing stock={type} title={type.title} />
                    })}
                    {/* <ShopItems columns={6} pageSize={18} /> */}
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>


    );
};
export default ShopHomePage;
