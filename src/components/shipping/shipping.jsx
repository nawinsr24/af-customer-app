import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import ModulePaymentOrderSummary from '../../components/shipping/shippingPaymentOrderSummary';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getProductData } from '../../services/product-service';
import { getCart } from '../../services/home-page-service';

const Shipping = () => {
    const address_data = localStorage.getItem('delivary_address') ? JSON.parse(localStorage.getItem('delivary_address')) : null;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [checkoutProducts, setcheckoutProducts] = useState([]);


    // Access query parameters
    const stock_id = queryParams.get('id');
    const { ctxtUser } = useAuthContext();
    const Router = useNavigate();
    async function getSingleProduct() {
        const productRes = await getProductData(stock_id);
        setcheckoutProducts(productRes);
    }
    async function getCartProducts() {
        const productRes = await getCart(ctxtUser.userId);
        setcheckoutProducts(productRes);

    }
    useEffect(() => {
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
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>International Shipping</small>
                                        <strong>$20.00</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">

                                    <a onClick={() => stock_id ? Router(`/checkout/?id=${stock_id}`) : Router('/checkout')}>
                                        <i className="icon-arrow-left mr-2"></i>
                                        Return to information
                                    </a>


                                    <a onClick={() => stock_id ? Router('/payment/?id=' + stock_id) : Router("/payment")} className="ps-btn">
                                        Continue to payment
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary checkoutProducts={checkoutProducts} shipping={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
