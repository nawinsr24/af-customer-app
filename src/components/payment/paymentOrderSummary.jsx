import React, { useEffect, useState } from 'react';
import { calculateAmount } from '../../utilities/ecomerce-helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductData } from '../../services/product-service';
import { getCart } from '../../services/home-page-service';
import { useAuthContext } from '../../context/AuthContext';

const ModulePaymentOrderSummary = ({ ecomerce, shipping, checkoutProductsFn }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [checkoutProducts, setcheckoutProducts] = useState([]);


    // Access query parameters
    const stock_id = queryParams.get('id');
    const { ctxtUser } = useAuthContext();
    const Router = useNavigate();
    async function getSingleProduct() {
        const productRes = await getProductData(stock_id);
        productRes?.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            }
        });
        checkoutProductsFn(productRes);
        setcheckoutProducts(productRes);
        if (!!!productRes?.length) {
            Router('/');
        }
    }
    async function getCartProducts() {
        const productRes = await getCart(ctxtUser?.userId);
        productRes?.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            }
        });
        checkoutProductsFn(productRes);
        setcheckoutProducts(productRes);
        if (!!!productRes?.length) {
            Router('/');
        }

    }
    useEffect(() => {
        if (stock_id) {
            getSingleProduct();
        } else {
            getCartProducts();
        }
    }, []);
    let listItemsView, shippingView, totalView;
    let amount;


    if (checkoutProducts && checkoutProducts.length > 0) {
        amount = calculateAmount(checkoutProducts);
        listItemsView = checkoutProducts.map((item, i) => (

            <a onClick={() => Router(`product/${item.stock_id}`)} key={`${item.stock_id}${i}`}>
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
export default ModulePaymentOrderSummary;
