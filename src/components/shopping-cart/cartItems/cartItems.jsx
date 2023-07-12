import React, { useContext, useState } from 'react';
import { Result } from 'antd';
import ProductCart from '../cartItems/productCartItems';
import { useAuthContext } from '../../../context/AuthContext';
import { notify } from '../../notify';
import { deleteCart } from '../../../services/home-page-service';
import { CartContext } from '../../../context/cartContext';

const CartItems = ({ cartItems, callBackFn, increaseCart, decreaseCart }) => {
    const { ctxtUser } = useAuthContext();
    const { removeFromCartContext } = useContext(CartContext);
    async function handleRemoveItem(cart) {
        await deleteCart(ctxtUser?.userId, cart.cart_id);
        removeFromCartContext(cart);
        notify("success", `${cart.name} removed from cart`);
        // setTemp(!temp);
        callBackFn(cart);
    }

    function handleIncreaseItemQty(data) {
        increaseCart(data);
    }

    function handleDecreaseItemQty(data) {
        decreaseCart(data);
    }

    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item, i) => (
            <tr key={`${item.stock_id}+${i}`}>
                <td>
                    <ProductCart product={item} />
                </td>
                <td data-label="price" className="price">
                    ₹{item.base_price}
                </td>
                <td data-label="quantity">
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(item)}>
                            +
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(item)}>
                            -
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.cart_quantity}
                            disabled={true}
                        />
                    </div>
                </td>
                <td data-label="total">
                    <strong>₹{(item.base_price * (item.cart_quantity)).toFixed(2)}</strong>
                </td>
                <td>
                    <a onClick={(e) => handleRemoveItem(item)}>
                        <i className="icon-cross"></i>
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default CartItems;
