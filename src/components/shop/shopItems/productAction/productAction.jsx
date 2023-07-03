import React, { useState } from 'react';
import { Modal } from 'antd';
import ProductDetailQuickView from '../../../shopHome/productQuickView/productQuickView';
import { addToCart } from '../../../../services/home-page-service';
import { useAuthContext } from '../../../../context/AuthContext';
import { notify } from '../../../notify';
import MiniCart from '../../../headers/modules/MiniCart';

const ProductActions = ({ product, ecomerce }) => {
    const { ctxtUser } = useAuthContext();
    const [isQuickView, setIsQuickView] = useState(false);
    const [reFreshCart, setReFreshCart] = useState(false);
    // const { addItem } = useEcomerce();

    async function handleAddItemToCart(data) {
        await addToCart(ctxtUser.userId, data);
        // const refreshCart = MiniCart({ isRefresh: true });
        setReFreshCart(true);
        setTimeout(() => {
            setReFreshCart(false);
        }, 100);
        notify("success", `${data.name} added to your cart`)
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Success!',
        //     content: `This item has been added to your cart`,
        // });
        // modal.update();
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update();
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
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
                    style={{ cursor: 'pointer' }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={() => handleAddItemToCart(product)}>
                    <i className="icon-bag2"></i>
                </a>
                <div style={{ display: 'none' }}>
                    {reFreshCart && < MiniCart isRefresh={reFreshCart} />}

                </div>
            </li>
            <li>
                <a
                    style={{ cursor: 'pointer' }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    click
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

export default ProductActions;
