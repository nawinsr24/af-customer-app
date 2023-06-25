import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
// import Router from 'next/router';
import { Spin } from 'antd';
// import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '../../ProductSearchResult';
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import { getAllSubCatService } from '../../../services/category-service';
import { customAlert } from '../../notify';


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const { isLoading, isError, error, data: subCatData } = useQuery([QueryKey.getAllSubCat], () => getAllSubCatService());


    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Router.push(`/search?keyword=${keyword}`);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    _limit: 5,
                    title_contains: keyword,
                };
                // const products = ProductRepository.getRecords(queries);
                // products.then((result) => {
                //     setLoading(false);
                //     setResultItems(result);
                //     setIsSearch(true);
                // });
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView, clearTextView, selectOptionView, loadingView, loadMoreView;

    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        {/* <Link to="/search"> */}
                        <a href='/search'>See all results</a>
                        {/* </Link> */}
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    if (subCatData) {
       const subCatDataNew = [{ id: "all", sub_category_name: "All" }, ...subCatData]
        selectOptionView = subCatDataNew.map((obj) => (
            <option value={obj?.id} key={obj?.id}>
                {obj?.sub_category_name}
            </option>
        ))
    }


    if (isError) {
        customAlert(error);
        // return <h2>Something went wrong</h2>
    }

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div className="ps-form__categories">
                <select className="form-control">{selectOptionView || []}</select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Search</button>
            <div
                className={`ps-panel--search-result${isSearch ? ' active ' : ''
                    }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
