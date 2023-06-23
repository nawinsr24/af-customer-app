import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '../arrow/NextArrow';
import PrevArrow from '../arrow/PrevArrow';
import { Link } from 'react-router-dom';
import { getAllBannersService } from '../../services/banner-service';
import QueryKey from '../../QueryKey';
import { useQuery } from 'react-query';
import { customAlert } from '../notify';
import Constants from '../../constants';


const HomeDefaultBanner = () => {
    const { isLoading, isError, error, data: bannersData } = useQuery([QueryKey.getAllBanners], () => getAllBannersService());
    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };



    if (isError) {
        customAlert(error);
        // return <h2>Something went wrong</h2>
    }
    return (
        <div className="ps-home-banner" >
            <Slider {...carouselSetting} className="ps-carousel" >
                {bannersData?.map((i) => <img src={`${Constants.imgUrl}${i?.banner_image}`} alt="af-banner" key={i?.banner_image} />)}

            </Slider>
        </div>
    );
};

export default HomeDefaultBanner;
