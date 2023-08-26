import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import ModulePaymentOrderSummary from '../../components/shipping/shippingPaymentOrderSummary';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getProductData } from '../../services/product-service';
import { getCart } from '../../services/home-page-service';
import { getDeliveryCharge } from '../../services/checkout-service';

const Shipping = () => {
    const address_data = localStorage.getItem('delivary_address') ? JSON.parse(localStorage.getItem('delivary_address')) : null;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [checkoutProducts, setcheckoutProducts] = useState([]);
    const [deliveryCharge, setDeliveryCharge] = useState(null);


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
            } else {
                pro.original_base_price = pro.base_price;
                pro.base_price = pro.total_price;
            }
        });
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
        setcheckoutProducts(productRes);
        if (!!!productRes?.length) {
            Router('/');
        }

    }

    async function getDeliveryChargeFn() {
        if (address_data?.pincode) {
            try {
                const resData = await getDeliveryCharge(address_data?.pincode);
                setDeliveryCharge(resData);
                console.log("res", resData);

            } catch {

            }


        }

    }
    useEffect(() => {
        getDeliveryChargeFn();
        if (stock_id) {
            getSingleProduct();
        } else {
            getCartProducts();
        }
    }, []);
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    {/* <figure>
                                        <small>Contact</small>
                                        <p>{ }</p>

                                        <a href="/checkout">Change</a>

                                    </figure> */}
                                    <figure>
                                        <small>Ship to</small>
                                        <p>{address_data ?
                                            address_data.house_flat_number + ", " + address_data.delivery_name + ", " + address_data.area + ", " + address_data.city + ", " + address_data.state + ", " + address_data.pincode : '--'}</p>

                                        <a onClick={() => stock_id ? Router(`/checkout/?id=${stock_id}`) : Router('/checkout')}>Change</a>

                                    </figure>
                                </div>
                                <h4>Delivery charge</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Total delivery charge</small>
                                        <strong> ₹{deliveryCharge?.total_delivery_charge || 0}</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer" style={{ margin: "10px 0px" }}>

                                    <a style={{ cursor: 'pointer' }} onClick={() => stock_id ? Router(`/checkout/?id=${stock_id}`) : Router('/checkout')}>
                                        <i className="icon-arrow-left mr-2"></i>
                                        Return to information
                                    </a>


                                    <button onClick={() => stock_id ? Router('/order-checkout/?id=' + stock_id) : Router("/order-checkout")} className="ps-btn">
                                        Continue to payment
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary checkoutProducts={checkoutProducts} deliveryCharge={deliveryCharge} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
