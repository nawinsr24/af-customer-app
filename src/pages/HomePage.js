import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
// import route from '../Routes';

// import SiteFeatures from '../components/components/partials/homepage/home-default/SiteFeatures';
// import HomeAdsColumns from '../components/components/partials/homepage/home-default/HomeAdsColumns';
// import HomeAds from '../components/components/partials/homepage/home-default/HomeAds';
// import DownLoadApp from '../components/components/partials/commons/DownLoadApp';
// import NewArrivals from '../components/components/partials/homepage/home-default/NewArrivals';
// import Newletters from '../components/components/partials/commons/Newletters';
// import HomeDefaultDealOfDay from '../components/components/partials/homepage/home-default/HomeDefaultDealOfDay';
// import HomeDefaultTopCategories from '../components/components/partials/homepage/home-default/HomeDefaultTopCategories';
// import HomeDefaultProductListing from '../components/components/partials/homepage/home-default/HomeDefaultProductListing';
// import HomeDefaultBanner from '../components/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '../components/layouts/PageContainer';

function HomePage() {
    const { ctxtUser, setLoadingScreen } = useAuthContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log("call use effect ---------------------");
    //     setLoadingScreen(true);
    //     console.log(ctxtUser?.token);
    //     if (ctxtUser?.token && ctxtUser?.type === 'sa')
    //         navigate(route.saBoLists, { replace: true });
    //     else
    //         navigate(route.login, { replace: true });

    //     setLoadingScreen(false);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <PageContainer title="Multipurpose Marketplace React Ecommerce Template">
            <main id="homepage-1">
                {/* <HomeDefaultBanner />
                <SiteFeatures />
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
                <NewArrivals collectionSlug="new-arrivals-products" />
                <Newletters /> */}
            </main>
        </PageContainer>
    );
}

export default HomePage