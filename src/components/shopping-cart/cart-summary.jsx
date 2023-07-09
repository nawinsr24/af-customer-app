import React from 'react';
import { calculateAmount } from '../../utilities/ecomerce-helpers';

const CartSummary = ({ source }) => {
    // View
    let productItemsView, amount;
    if (source && source.length > 0) {
        amount = calculateAmount(source);
        productItemsView = source.map((item) => (
            <li key={item.id}>
                <span className="ps-block__estimate">

                    <a href={`/product/${item.stock_id}`} className="ps-product__title">
                        {item.name}
                        <br /> x {item.cart_quantity}
                    </a>

                </span>
            </li>
        ));
    }

    return (
        <>
            <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                    <p>
                        Subtotal <span> ₹{amount}</span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3>
                        Total <span>₹{amount}</span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default CartSummary;
