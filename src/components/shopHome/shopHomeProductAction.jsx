import React, { useState } from 'react';
import { Modal } from 'antd';
import ProductDetailQuickView from './productQuickView/productQuickView';
import { useAuthContext } from '../../context/AuthContext';
import { addToCart } from '../../services/home-page-service';
import { notify } from '../notify';
const ModuleProductActions = ({ product, ecomerce }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const { ctxtUser } = useAuthContext();
    async function handleAddItemToCart(data) {
        const reqObj = [{
            user_id: ctxtUser.userId,
            stock_id: data.stock_id,
            cart_quantity: 1
        }];
        const res = await addToCart(reqObj);
        if (res.success) {
            notify("success", `${data.name} added to your cart`);
        } else {
            notify("error", `Failed to add items to cart.`);
        }

    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update();
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        // addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        });
        modal.update();
    }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };
    return (
        <ul className="ps-product__actions">
            <li>
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={() => handleAddItemToCart(product)}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            <li>
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li>
            {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    onClick={handleAddItemToWishlist}>
                    <i className="icon-heart"></i>
                </a>
            </li> */}
            {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li> */}
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default ModuleProductActions;
