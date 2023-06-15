import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import ShopItems from '../../components/shop/shopItems/shopItem';
// import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '../../components/shop/shopCategories';
// import ShopBrands from '~/components/partials/shop/ShopBrands';
// import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '../../components/shop/widgetShopCategories';
// import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '../../components/shop/widgetShopFilterByPriceRange';
import PageContainer from '../../components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

const ShopPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
        },
    ];

    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    {/* <ShopBanner /> */}
                    {/* <ShopBrands /> */}
                    <ShopCategories />
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            {/* <WidgetShopBrands /> */}
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-best-seller-items"
                                title="Best Sale Items"
                            /> */}
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-recommend-items"
                                title="Recommended Items"
                            /> */}
                            <ShopItems columns={6} pageSize={18} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>
    );
};
export default ShopPage;
