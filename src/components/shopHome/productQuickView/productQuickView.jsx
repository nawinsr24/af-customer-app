import React from 'react';
import ModuleDetailTopInformation from './topInformation';
import ModuleProductDetailDescription from './detailsDescription';
import ModuleDetailShoppingActions from './shoppingActions';
// import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
// import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from './mobileAction';
import ProductQuickViewThumbnail from './productQuickViewThumbnail';

const ProductDetailQuickView = ({ product }) => (
    <div className="ps-product--detail ps-product--quickview">
        <div className="ps-product__header">
            <ProductQuickViewThumbnail product={product} vertical={false} />
            <div className="ps-product__info">
                <ModuleDetailTopInformation product={product} />
                <ModuleProductDetailDescription product={product} />
                <ModuleDetailShoppingActions
                    product={product}
                    extended={true}
                />
                {/* <ModuleProductDetailSpecification /> */}
                {/* <ModuleProductDetailSharing /> */}
                {/* <ModuleDetailActionsMobile product={product} /> */}
            </div>
        </div>
    </div>
);

export default ProductDetailQuickView;
