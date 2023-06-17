import React, { useEffect } from 'react';
import { calculateAmount } from '../../utilities/ecomerce-helpers';

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
    // const { products, getProducts } = useEcomerce();

    // useEffect(() => {
    //     if (ecomerce.cartItems) {
    //         getProducts(ecomerce.cartItems, 'cart');
    //     }
    // }, [ecomerce]);

    // view
    let listItemsView, shippingView, totalView;
    let amount;

    let products = [{ id: 1, quantity: 1, price: 200, thumbnail: 'https://beta.apinouthemes.com/uploads/e98492a0c2b24ae5892641009bf21056.jpg', title: 'Sleeve Linen Blend Caro Pane Shirt' },
    { id: 2, quantity: 2, price: 200, thumbnail: 'https://beta.apinouthemes.com/uploads/e98492a0c2b24ae5892641009bf21056.jpg', title: 'Sleeve Linen Blend Caro Pane Shirt' }];;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
        listItemsView = products.map((item) => (

            <a href="/" key={item.id}>
                <strong>
                    {item.title}
                    <span>x{item.quantity}</span>
                </strong>
                <small>${item.quantity * item.price}</small>
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
export default ModulePaymentOrderSummary;
