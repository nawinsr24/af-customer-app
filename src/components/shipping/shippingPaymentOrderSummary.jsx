import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { connect } from 'react-redux';
// import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '../../utilities/ecomerce-helpers';

const shippingPaymentOrderSummary = ({ checkoutProducts, ecomerce, deliveryCharge }) => {

    // view
    let listItemsView, shippingView, totalView;
    let amount;
    if (checkoutProducts && checkoutProducts.length > 0) {
        amount = calculateAmount(checkoutProducts);
        listItemsView = checkoutProducts.map((item, i) => (

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                <a style={{ width: "32%" }} href={`/product/${item.stock_id}`} key={`${item.stock_id}+${i}`}>
                    <strong>
                        {item.name}
                        <span> x{item.cart_quantity || 1}</span>
                    </strong>
                </a>

                <span>{item.discount_percentage ? Number(item.discount_percentage) + '%' : '--'}</span>
                <span>{item.gst_rate}%</span>
                <span>₹{(item.cart_quantity || 1) * item.base_price}</span>
            </div>

        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (!!!deliveryCharge?.is_free_delivery) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Delivery charge</strong>
                    <small>₹{deliveryCharge?.total_delivery_charge || 0}</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{(parseInt(amount) + Number(deliveryCharge?.total_delivery_charge || 0))}</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>₹{parseInt(amount)}</strong>
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
                        <strong>Discount</strong>
                        <strong>Gst</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure style={{
                    "display": "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}>{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>₹{amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default shippingPaymentOrderSummary;
