import React from 'react';
// import ShopBrands from '~/components/partials/shop/ShopBrands';
// import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopItems from '../../components/shop/shopItems/shopItem';
// import ProductGroupByCarousel from '../../components/shopHome/productGropByCarousel/ProductGroupByCarousel';
import PageContainer from '../../components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

const ShopHomePage = () => {

    return (
        <PageContainer title="Home">
            <div className="ps-page--shop">
                <div className="ps-container">
                    {/* <ShopBanner /> */}
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
