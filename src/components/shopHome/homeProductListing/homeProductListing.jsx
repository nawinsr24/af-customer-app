import React, { useEffect, useState } from 'react';
import SkeletonProduct from '../../skeleton/productSkeleton/productSkeleton';
import { generateTempArray } from '../../../utilities/common-helpers';
import { ProductGroupWithCarousel } from './productgroupWithCarousel/productGroupWithCarousel';
import { getStockByType } from '../../../services/home-page-service';
import { searchProduct } from '../../../services/search-service';
const HomeDefaultProductListing = ({ product, stock, collectionSlug, title }) => {
    const [currentCollection, setCurrentCollection] = useState('new-arrivals');
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionLinks = [
        {
            title: 'New Arrivals',
            name: 'new-arrivals',
            slug: collectionSlug,
        },
        {
            title: 'Best seller',
            name: 'best-seller',
            slug: 'fullwidth-clothing-best-sellers',
        },
        {
            title: 'Most Popular',
            name: 'most-popular',
            slug: 'fullwidth-clothing-most-popular',
        },
    ];

    function handleChangeTab(e, tab) {
        e.preventDefault();

        setCurrentCollection(tab.name);
        // getProductsByCollection(tab.slug);
    }

    useEffect(() => {
        const getData = async () => {
            let resData;
            if (stock?.type == 'similar_product') {
                const reqObj = {
                    sub_category: product.sub_category_id
                };
                resData = await searchProduct(reqObj);
            } else {
                resData = await getStockByType(stock?.type);
            }
            setProductItems(resData?.data);
            setLoading(false);
        };
        getData();
    }, [stock?.type, product]);

    const sectionLinksView = sectionLinks.map((link, i) => (
        <li
            className={currentCollection === link.name ? 'active' : ''}
            key={link.stock_id + i}>
            <a onClick={(e) => handleChangeTab(e, link)}>
                {link.title}
            </a>
        </li>
    ));

    // views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItems.forEach((pro) => {
                if (pro.discount_percentage) {
                    const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                    const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                    pro.original_base_price = pro.base_price;
                    pro.base_price = final_price;
                }

            });
            productItemsView = (
                <ProductGroupWithCarousel
                    products={productItems}
                    type="fullwidth"
                />
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-product-list" style={{ margin: "10px 0px" }}>
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">
                        {/* {sectionLinksView} */}
                        <li>
                            <a href={`/shop`}>View All</a>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultProductListing;
