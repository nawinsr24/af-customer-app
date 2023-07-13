import React, { useEffect, useState } from 'react';
import { getAllSubCatService } from '../../services/category-service';
import { useLocation, useNavigate } from 'react-router-dom';

const WidgetShopCategories = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // Access query parameters
    const sub_category = queryParams.get('sub_cat');
    const slug = sub_category;
    const Router = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        setLoading(true);
        const res = await getAllSubCatService();
        setCategories(res);
        setTimeout(
            function () {
                setLoading(false);
            }.bind(this),
            250
        );

    };
    async function getCategories() {

        // const responseData = await ProductRepository.getProductCategories();
        // if (responseData) {
        //     setCategories(responseData);
        //     setTimeout(
        //         function () {
        //             setLoading(false);
        //         }.bind(this),
        //         250
        //     );
        // }
    }

    useEffect(() => {
        getData();
    }, []);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li
                    key={item.id}
                    className={item.id == slug ? 'active' : ''}>
                    <a style={{ cursor: "pointer" }} onClick={() => Router(`/shop/?sub_cat=${item.id}`)}>{item.sub_category_name}</a>
                </li >
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
