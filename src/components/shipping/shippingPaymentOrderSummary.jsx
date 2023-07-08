import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { connect } from 'react-redux';
// import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '../../utilities/ecomerce-helpers';

const shippingPaymentOrderSummary = ({ checkoutProducts, ecomerce, shipping }) => {

    // view
    let listItemsView, shippingView, totalView;
    let amount;
    if (checkoutProducts && checkoutProducts.length > 0) {
        amount = calculateAmount(checkoutProducts);
        listItemsView = checkoutProducts.map((item, i) => (

            <a href="/" key={`${item.stock_id}=${i}`}>
                <strong>
                    {item.name}
                    <span>x{item.cart_quantity || 1}</span>
                </strong>
                <small>${(item.cart_quantity || 1) * item.base_price}</small>
            </a>

        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (shipping === true) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>$20.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>${parseInt(amount) + 20}.00</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>${parseInt(amount)}.00</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>${amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default shippingPaymentOrderSummary;
