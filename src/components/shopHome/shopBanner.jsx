import React from 'react';
import Slider from 'react-slick';
import NextArrow from '../arrow/NextArrow';
import PrevArrow from '../arrow/PrevArrow';
import { useQuery } from 'react-query';
import QueryKey from '../../QueryKey';
import { getAllBannersService } from '../../services/banner-service';
import { customAlert } from '../notify';
import Constants from '../../constants';


const ShopBanner = () => {
    const { isLoading, isError, error, data: bannersData } = useQuery([QueryKey.getAllBanners], () => getAllBannersService());
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
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
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                {bannersData?.map((i) => <img src={`${Constants.imgUrl}${i?.banner_image}`} alt="af-banner" key={i?.banner_image}/>)}

            </Slider>
        </div>
    );
}

export default ShopBanner;
