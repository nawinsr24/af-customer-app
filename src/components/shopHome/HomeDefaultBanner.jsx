import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '../arrow/NextArrow';
import PrevArrow from '../arrow/PrevArrow';
import Constants from '../../constants';
import { useQuery } from 'react-query';
import QueryKey from '../../QueryKey';
import { getAllBannersService } from '../../services/banner-service';
const HomeDefaultBanner = () => {
    const { isLoading, isError, error, data: bannerItems } = useQuery([QueryKey.getAllBanners], () => getAllBannersService());
    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Views
    let mainCarouselView;
    if (bannerItems) {
        const carouseItems = bannerItems.map((item, i) => (
            <div className="slide-item" style={{ height: "100%" }} key={`${item.id}${i}`}>
                <a className="ps-banner-item--default bg--cover">
                    <img src={`${Constants.imgUrl}${item?.banner_image}`} alt="af-banner" key={item?.banner_image} />
                </a>

            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <div style={{ marginTop: "10px" }} className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">{mainCarouselView}</div>
                {/* <div className="ps-section__right">
                    <Promotion
                        link="/shop"
                        image={promotion1 ? promotion1.image : null}
                    />
                    <Promotion
                        link="/shop"
                        image={promotion2 ? promotion2.image : null}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default HomeDefaultBanner;

