import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import ProductSearchResult from '../../ProductSearchResult';
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import { getAllSubCatService } from '../../../services/category-service';
import { customAlert } from '../../notify';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../../../services/search-service';

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
    const Router = useNavigate();
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState([]);
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
        Router(`/shop?keyword=${keyword}`);
    }
    async function getproduct() {
        const reqObj = { keyword };
        const searchRes = await searchProduct(reqObj);
        setLoading(false);
        setResultItems(searchRes.data);
        setIsSearch(true);
    }
    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                getproduct();
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
    }, [debouncedSearchTerm, keyword]);

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
            productItemsView = resultItems.map((product, i) => (
                <ProductSearchResult product={product} key={`${product.stock_id}+${i}`} />
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
        const subCatDataNew = [{ id: "all", sub_category_name: "All" }, ...subCatData];
        selectOptionView = subCatDataNew.map((obj) => (
            <option value={obj?.id} key={obj?.id}>
                {obj?.sub_category_name}
            </option>
        ));
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
