import React from 'react';
// import ShopBrands from '~/components/partials/shop/ShopBrands';
// import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopItems from '../../components/shop/shopItems/shopItem';
import ShopBanner from '../../components/shopHome/shopBanner';
// import ProductGroupByCarousel from '../../components/shopHome/productGropByCarousel/ProductGroupByCarousel';
import PageContainer from '../../components/layouts/PageContainer';
import HomeDefaultDealOfDay from '../../components/shopHome/dealOfTheDay/dealOfTheDay';
import HomeDefaultProductListing from '../../components/shopHome/homeProductListing/homeProductListing';
// import Newletters from '~/components/partials/commons/Newletters';

const ShopHomePage = () => {

    const stockType = [{ type: 'most_popular', title: "Most popular" }, { type: 'best_selling', title: "Best selling" }]
    return (
        <PageContainer title="Home">
            <div className="ps-page--shop">
                <div className="ps-container">
                    <ShopBanner />
                    <HomeDefaultDealOfDay />
                    {stockType.map((type) => {

                        return <HomeDefaultProductListing stock={type} title={type.title} />
                    })}
                    {/* <ShopBrands /> */}
                    {/* <ShopCategories /> */}
                    {/* <ProductGroupByCarousel
                        layout="fullwidth"
                        collectionSlug="shop-best-seller-items"
                        title="Best Sale Items"
                    /> */}
                    {/* <ProductGroupByCarousel
                        layout="fullwidth"
                        collectionSlug="shop-recommend-items"
                        title="Recommended Items"
                    /> */}
                    <ShopItems columns={6} pageSize={18} />
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>


    );
};
export default ShopHomePage;
