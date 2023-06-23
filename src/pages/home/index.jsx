import React from 'react';
import PageContainer from '../../components/layouts/PageContainer';
import HomeDefaultBanner from '../../components/home/HomeDefaultBanner';


const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Home">
            <main id="homepage-1">
                <HomeDefaultBanner />
               
                {/* <SiteFeatures />
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                <HomeAdsColumns />
                <HomeDefaultTopCategories />
                <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title="Consumer Electronics"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothings"
                    title="Clothings"
                />
                <HomeDefaultProductListing
                    collectionSlug="garden-and-kitchen"
                    title="Garden & Kitchen"
                />
                <HomeAds />
                <DownLoadApp />
                <NewArrivals collectionSlug="new-arrivals-products" /> */}
                {/* <Newletters /> */}
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
