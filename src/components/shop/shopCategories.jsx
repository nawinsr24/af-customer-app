import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

import shop_data from '../../static/data/shopCategories.json';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getAllSubCatService } from '../../services/category-service';
import Constants from '../../constants';

const ShopCategories = () => {

    const { ctxtUser } = useAuthContext();
    const [subCategories, setSubCategories] = useState([]);
    const getData = async () => {
        const res = await getAllSubCatService();
        setSubCategories(res);
    };
    const Router = useNavigate();

    const onSelect = (category) => {
        console.log("CAT", category);
        Router(`/shop/?sub_cat=${category.id}`);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="ps-shop-categories">
            <div className="row align-content-lg-stretch">
                {subCategories.map((category) => (
                    <div onClick={() => onSelect(category)} style={{ cursor: "pointer" }}
                        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 "
                        key={category.id}>
                        <div className="ps-block--category-2" data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img src={`${Constants.imgUrl}${category.image}`} alt="martfury" />
                            </div>
                            <div className="ps-block__content">
                                <h4>{category.category_name}</h4>
                                <ul>
                                    {category.catDescription}
                                    {/* {category.links &&
                                        category.links.map((link) => (
                                            <li key={link}>

                                                <a onClick={() => Router("/shop")}>{link}</a>

                                            </li>
                                        ))} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ShopCategories;
