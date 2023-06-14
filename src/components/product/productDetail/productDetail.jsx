import React from 'react';
import Thumbnail from './thumbnail';
import Description from './description/description';
import ActionsSidebar from './detailActionsSideBar';
import DetailTopInformation from './topInformation';
import ProductDetailDescription from './productDetailDescription';
import DetailActionsMobile from './detailActionsMobile';

const ProductDetail = ({ product }) => {
    let priceView;
    if (product) {
        if (product.is_sale === true) {
            priceView = (
                <h4 className="ps-product__price sale">
                    <del className="mr-2">${product.sale_price}</del>$
                    {product.price}
                </h4>
            );
        } else {
            priceView = <h4 className="ps-product__price">${product.price}</h4>;
        }
        return (
            <div className="ps-product--detail ps-product--full-content">
                <div className="ps-product__top">
                    <div className="ps-product__header">
                        <Thumbnail product={product} vertical={false} />
                        <div className="ps-product__info">
                            <DetailTopInformation product={product} />
                            <ProductDetailDescription product={product} />
                            <DetailActionsMobile />
                        </div>
                    </div>
                    <div className="ps-product__price-right">
                        {priceView}
                        <ActionsSidebar product={product} />
                    </div>
                </div>
                <Description />
            </div>
        );
    }
};

export default ProductDetail;
