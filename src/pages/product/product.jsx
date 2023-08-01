import React, { useEffect, useState } from 'react';
import SkeletonProductDetail from '../../components/product/SkeletonProductDetail/SkeletonProductDetail';
import BreadCrumb from '../../components/BreadCrumb';
import ProductDetail from '../../components/product/productDetail/productDetail';
// import CustomerBought from '~/components/partials/product/CustomerBought';
// import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '../../components/layouts/PageContainer';
import { getProductById, getProductData } from '../../services/product-service';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../../components/notify';


const ProductDetailPage = () => {
    const { pid } = useParams();
    const Router = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getData() {
        if (pid) {
            const res = await getProductById(pid);
            if (res?.length) {
                setProduct(res[0]);
                setLoading(false);
            } else {
                // Router('/');
                notify("error", "Not Found");
            }

        } else {
            Router('/');
        }

    }

    useEffect(() => {
        getData(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product ? product.name : 'Loading...',
        },
    ];
    // Views
    let productView;
    if (!loading) {
        product?.stock_data.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            }
        });
        productView = <ProductDetail product={product} />;

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
