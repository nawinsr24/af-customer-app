import React, { useEffect, useState } from 'react';
import { calculateAmount } from '../../utilities/ecomerce-helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductData } from '../../services/product-service';
import { getCart } from '../../services/home-page-service';
import { useAuthContext } from '../../context/AuthContext';

const ModulePaymentOrderSummary = ({ ecomerce, shipping, checkoutProductsFn, deliveryCharge }) => {
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
            else {
                pro.original_base_price = pro.base_price;
                pro.base_price = pro.total_price;
            }
            // pro.cart_quantity = 1;
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
            } else {
                pro.original_base_price = pro.base_price;
                pro.base_price = pro.total_price;
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
                    <strong>₹{parseInt(amount) + Number(deliveryCharge?.total_delivery_charge || 0)}</strong>
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
export default ModulePaymentOrderSummary;
