import React, { useEffect, useState } from 'react';
import Thumbnail from './thumbnail';
import Description from './description/description';
import ActionsSidebar from './detailActionsSideBar';
import DetailTopInformation from './topInformation';
import ProductDetailDescription from './productDetailDescription';
import DetailActionsMobile from './detailActionsMobile';
import { useLocation } from 'react-router-dom';
import HomeDefaultProductListing from '../../shopHome/homeProductListing/homeProductListing';

const ProductDetail = ({ product }) => {
    const location = useLocation();
    const similar_product = { type: 'similar_product', title: "Similar product" };
    const queryParams = new URLSearchParams(location.search);

    // Access query parameters
    const stock_id = queryParams.get('s_id');
    let priceView;
    const [stockData, setStockData] = useState([]);

    const setData = (stock) => {
        if (stock) {
            setStockData(stock);
        } else {
            const filter_stock = product?.stock_data.find((s) => s.stock_id === stock_id);
            setStockData(filter_stock);
        }
    };
    useEffect(() => {
        setData();
    }, []);
    if (stockData) {
        if (stockData.discount_percentage) {
            priceView = (
                <h4 className="ps-product__price sale">
                    <del className="mr-2">₹{stockData.original_base_price}</del>₹
                    {stockData.base_price}
                </h4>
            );
        } else {
            priceView = <h4 className="ps-product__price">₹{stockData.total_price}</h4>;
        }
        return (
            <div className="ps-product--detail ps-product--full-content">
                <div className="ps-product__top">
                    <div className="ps-product__header">
                        <Thumbnail product={stockData} vertical={false} />
                        <div className="ps-product__info">
                            <DetailTopInformation product={stockData} />
                            <ProductDetailDescription callBackFn={setData} product={product} />
                            {/* <DetailActionsMobile product={stockData} /> */}
                        </div>
                    </div>
                    <div className="ps-product__price-right">
                        {priceView}
                        <ActionsSidebar product={stockData} />
                    </div>
                </div>
                <Description product={product} />
                <HomeDefaultProductListing product={stockData} stock={similar_product} title={similar_product.title} />
            </div>
        );
    }
};

export default ProductDetail;
