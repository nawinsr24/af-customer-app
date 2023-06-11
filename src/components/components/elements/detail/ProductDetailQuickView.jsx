import React from 'react';
import ThumbnailDefault from '../../elements/detail/thumbnail/ThumbnailDefault';
import ModuleDetailTopInformation from '../../elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '../../elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '../../elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '../../elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '../../elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '../../elements/detail/modules/ModuleDetailActionsMobile';

const ProductDetailQuickView = ({ product }) => (
    <div className="ps-product--detail ps-product--quickview">
        <div className="ps-product__header">
            <ThumbnailDefault product={product} vertical={false} />
            <div className="ps-product__info">
                <ModuleDetailTopInformation product={product} />
                <ModuleProductDetailDescription product={product} />
                <ModuleDetailShoppingActions
                    product={product}
                    extended={true}
                />
                <ModuleProductDetailSpecification />
                <ModuleProductDetailSharing />
                <ModuleDetailActionsMobile />
            </div>
        </div>
    </div>
);

export default ProductDetailQuickView;
