import React, { useEffect, useState } from 'react';

import ModulePaymentOrderSummary from '../../components/payment/paymentOrderSummary';
import ModulePaymentShipping from '../../components/payment/paymentShipping';
import ModulePaymentMethods from '../../components/payment/paymentMethods';
import { useNavigate } from 'react-router-dom';
import { getDeliveryCharge } from '../../services/checkout-service';

const Payment = () => {
    const Router = useNavigate();
    const [address, setAddress] = useState(null);
    const address_data = localStorage.getItem('delivary_address') ? JSON.parse(localStorage.getItem('delivary_address')) : null;

    const [checkoutProducts, setcheckoutProducts] = useState(null);
    const [deliveryCharge, setDeliveryCharge] = useState(null);

    const getAddress = (d) => {
        setAddress(d);
    };
    const getCheckoutProducts = (d) => {
        setcheckoutProducts(d);
    };
    async function getDeliveryChargeFn() {
        if (address_data?.pincode) {

            const resData = await getDeliveryCharge(address_data?.pincode);
            setDeliveryCharge(resData);
            console.log("res", resData);
        }

    }
    useEffect(() => {
        getDeliveryChargeFn();
    }, []);
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Payment</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <ModulePaymentShipping addressFn={getAddress} deliveryCharge={deliveryCharge} />
                                <ModulePaymentMethods address={address} deliveryCharge={deliveryCharge} checkoutProducts={checkoutProducts} />
                                <div className="ps-block__footer">

                                    <a onClick={() => Router('/shipping')}>
                                        <i className="icon-arrow-left mr-2"></i>
                                        Return to shipping
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary checkoutProductsFn={getCheckoutProducts} deliveryCharge={deliveryCharge} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
