import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SkeletonProduct from '../../skeleton/productSkeleton/productSkeleton';
import { carouselFullwidth } from '../../../utilities/carousel-helpers';
import CountDownSimple from './countDown';
import ProductDealOfDay from './productDealOfTheDay/productDealOfTheDay';
import { generateTempArray } from '../../../utilities/common-helpers';
import { getDealOfTheDay } from '../../../services/home-page-service';
import { useNavigate } from 'react-router-dom';

const HomeDefaultDealOfDay = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const Router = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const dealOfTheDayResponse = await getDealOfTheDay();
            setProductItems(dealOfTheDayResponse?.data);
            setLoading(false);
        };
        getData();

    }, []);

    // Views
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
            const slideItems = productItems.map((item, i) => (
                <ProductDealOfDay product={item} key={`${item.stock_id}+${i}`} />
            ));
            productItemsView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {slideItems}
                </Slider>
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
        <div className="ps-deal-of-day">
            <div className="ps-container">
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Deal of the day</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>

                    <a onClick={() => Router("/shop")}>View all</a>

                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
