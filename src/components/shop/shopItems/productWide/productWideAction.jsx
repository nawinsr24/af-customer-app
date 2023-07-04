import React from 'react';
import { Modal } from 'antd';
import { useAuthContext } from '../../../../context/AuthContext';
import { addToCart } from '../../../../services/home-page-service';
import { notify } from '../../../notify';
const ModuleProductWideActions = ({ ecomerce, product }) => {
    const { ctxtUser } = useAuthContext();

    const price = (payload) => {
        let view;
        if (payload.sale_price) {
            view = (
                <p className="ps-product__price sale">
                    <span>$</span>
                    {payload.sale_price}
                    <del className="ml-2">
                        <span>$</span>
                        {payload.price}
                    </del>
                </p>
            );
        } else {
            view = (
                <p className="ps-product__price">
                    <span>$</span>
                    {payload.price}
                </p>
            );
        }
        return view;
    }
    // const { price } = useProduct();
    // const { addItem } = useEcomerce();
    async function handleAddItemToCart(data) {
        await addToCart(ctxtUser.userId, data);
        notify("success", `${data.name} added to your cart`)
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

    return (
        <div className="ps-product__shopping">
            {price(product)}
            <a
                className="ps-btn"
                onClick={(e) => handleAddItemToCart(product)}>
                Add to cart
            </a>
            {/* <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li>
            </ul> */}
        </div>
    );
};

export default ModuleProductWideActions;
