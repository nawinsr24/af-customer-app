import React, { useEffect, useState } from 'react';
import SkeletonProduct from '../../skeleton/productSkeleton/productSkeleton';
import { generateTempArray } from '../../../utilities/common-helpers';
import { ProductGroupWithCarousel } from './productgroupWithCarousel/productGroupWithCarousel';
import { getStockByType } from '../../../services/home-page-service';
const HomeDefaultProductListing = ({ stock, collectionSlug, title }) => {
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
            const resData = await getStockByType(stock.type);
            setProductItems(resData.data);
            setLoading(false);
        };
        getData();
    }, [stock.type]);

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
        <div className="ps-product-list">
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
