import React, { useEffect, useState } from 'react';
import Product from '../../components/shop/shopItems/product/product';
import { useLocation } from 'react-router-dom';
import { searchProduct } from '../../services/search-service';
import PageContainer from '../../components/layouts/PageContainer';
import BreadCrumb from '../../components/BreadCrumb';
import ProductGroupGridItems from '../../components/search/productGroupGridItems/productGroupGridItems';
const SearchPage = () => {
    const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // Access query parameters
    const query = queryParams.get('keyword');
    const getProducts = async () => {
        const reqObj = { keyword: query };
        const searchRes = await searchProduct(reqObj);
        setLoading(false);
        setProductItems(searchRes.data);
        console.log("searchRes", searchRes);
    };
    function handleSetKeyword() {
        if (query && query.length > 0) {
            setKeyword(query);
        } else {
            setKeyword('');
        }
    }

    useEffect(() => {
        if (query && query.length > 0) {
            handleSetKeyword(query);
            getProducts();
        }
    }, [query]);

    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Result',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (productItems) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={pageSize} />
            );
            if (productItems.length > 0) {
                const items = productItems.map((item) => {
                    return (
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {productItems.length}
                        </strong>{' '}
                        record(s) found.
                    </p>
                );
            } else {
                shopItemsView = <p>No product(s) found.</p>;
            }
        } else {
            shopItemsView = <p>No product(s) found.</p>;
        }
    } else {
        statusView = <p>Searching...</p>;
    }

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>
                                Search result for: "<strong>{keyword}</strong>"
                            </h1>
                        </div>
                        <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Newsletters layout="container" /> */}
        </PageContainer>
    );
};

export default SearchPage;
