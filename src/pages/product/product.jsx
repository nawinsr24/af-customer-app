import React, { useEffect, useState } from 'react';
import SkeletonProductDetail from '../../components/product/SkeletonProductDetail/SkeletonProductDetail';
import BreadCrumb from '../../components/BreadCrumb';
import ProductDetail from '../../components/product/productDetail/productDetail';
// import CustomerBought from '~/components/partials/product/CustomerBought';
// import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '../../components/layouts/PageContainer';

const ProductDetailPage = () => {
    const { pid } = 3;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        // setLoading(true);
        // const responseData = await ProductRepository.getProductsById(pid);
        // if (responseData) {
        setProduct({
            title: 'Mobile',
            is_sale: true,
            sale_price: 12,
            price: 21


        });
        //     setTimeout(
        //         function () {
        //             setLoading(false);
        //         }.bind(this),
        //         250
        //     );
        // }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        // {
        //     text: 'Product',
        //     url: '/shop',
        // },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView;
    if (!loading) {
        if (true) {

            productView = <ProductDetail product={product} />;
        } else {
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <PageContainer title={product ? product.title : 'Loading...'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="container">
                    {productView}
                    {/* <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    /> */}
                    {/* <RelatedProduct collectionSlug="shop-recommend-items" /> */}
                </div>
            </div>
        </PageContainer>
    );
};

export default ProductDetailPage;
