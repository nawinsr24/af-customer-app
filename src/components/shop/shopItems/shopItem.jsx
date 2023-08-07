import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from './product/product';
import ProductWide from './productWide/productWide';
// import ProductRepository from '~/repositories/ProductRepository';
import ProductSortBy from '../shopItems/productSortBy';
// import { useRouter } from 'next/router';
import { generateTempArray } from '../../../utilities/common-helpers';
import SkeletonProduct from './skeletonProduct';

import data from '../../../static/data/product.json';
import { useLocation } from 'react-router-dom';
import { searchProduct } from '../../../services/search-service';
// import useGetProducts from '~/hooks/useGetProducts';

const ShopItems = ({ price, columns = 4, pageSize = 12 }) => {
    // const Router = useRouter();
    // const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [SortType, setSortType] = useState('low_to_high');
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // Access query parameters
    const query_keyword = queryParams.get('keyword');
    const sub_category = queryParams.get('sub_cat');
    const getProducts = async () => {
        const reqObj = {
            keyword: query_keyword,
            price_from: price.price_from, price_to: price.price_to,
            sort_type: SortType,
            sub_category
        };
        const searchRes = await searchProduct(reqObj);
        setLoading(false);
        searchRes?.data?.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            }
        });
        setProductItems(searchRes?.data);
        setTotal(searchRes?.page?.total_Pages);
    };
    function handleSetKeyword() {
        if (query_keyword && query_keyword.length > 0) {
            setKeyword(query_keyword);
        } else {
            setKeyword('');
        }
    }
    const getSortType = (s) => {
        setSortType(s);
    };
    useEffect(() => {
        if (query_keyword && query_keyword.length > 0) {
            handleSetKeyword(query_keyword);
        }
        getProducts();
    }, [query_keyword, sub_category, price, SortType]);
    const { page } = 100;
    // const { query } = { page: 1 };
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );

    // const { productItems, loading, getProducts } = useGetProducts();

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    function handlePagination(page, pageSize) {
        // Router.push(`/shop?page=${page}`);
    }

    async function getTotalRecords(params) {
        // const responseData = await ProductRepository.getTotalRecords();
        // if (responseData) {
        //     setTotal(responseData);
        // }
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    useEffect(() => {
        let params;
        if (query_keyword) {
            if (query_keyword) {
                params = {
                    _start: page * pageSize,
                    _limit: pageSize,
                };
            } else {
                params = query_keyword;
                params._limit = pageSize;
            }
        } else {
            params = {
                _limit: pageSize,
            };
        }
        getTotalRecords();
        // getProducts(params);
        handleSetColumns();
    }, [query_keyword]);

    // Views
    let productItemsView;
    // let productItems = data.relatedProduct;
    // const loading = true;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.id}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                {query_keyword?.length ? <p >
                    <strong className="mr-2">{productItems?.length || 0}</strong>
                    Products found
                </p> : <p></p>}

                <div className="ps-shopping__actions">
                    <ProductSortBy sortTypeFn={getSortType} />
                    <div className="ps-shopping__view">
                        <p>View</p>
                        <ul className="ps-tab-list">
                            <li className={listView === true ? 'active' : ''}>
                                <a

                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            <li className={listView !== true ? 'active' : ''}>
                                <a

                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-list4"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            {
                productItems?.length ?
                    <div className="ps-shopping__footer text-center">
                        <div className="ps-pagination">
                            <Pagination
                                total={total - 1}
                                pageSize={pageSize}
                                responsive={true}
                                showSizeChanger={false}
                                current={page !== undefined ? parseInt(page) : 1}
                                onChange={(e) => handlePagination(e)}
                            />
                        </div>
                    </div>
                    : ''
            }

        </div>
    );
};

export default ShopItems;
