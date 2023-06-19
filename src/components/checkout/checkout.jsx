import React, { useState } from 'react';
import { Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import FormCheckoutInformation from '../../components/checkout/formCheckoutInformation';
import ModulePaymentOrderSummary from '../../components/checkout/paymentOrderSummary';
const Checkout = () => {
    const Router = useNavigate();
    const [is_add_adrress, isAddAddress] = useState(false);
    const [address, setAddress] = useState(false);
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    function isAddAddressFn(showAddressList) {
        console.log("showAddressList", showAddressList);
        isAddAddress(showAddressList)

    }

    const submit = () => {
        Router('/shipping')
    }

    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Checkout Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    {is_add_adrress
                                        ? <FormCheckoutInformation onValueChange={isAddAddressFn} />
                                        : <><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <h3>Shipping Address</h3>
                                            <div className="ps-block__footer">
                                                <button className="ps-btn" onClick={e => isAddAddress(true)}>Add Address</button>
                                            </div>
                                        </div>
                                            <div style={{ padding: '30px 20px', borderRadius: '4px', backgroundColor: '#fff', border: '2px solid #eaeaea', marginBottom: '10px', marginTop: '22px' }}>
                                                <div >
                                                    <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                                                        onChange={(e) => handleAddressChange(e)}
                                                        value={address}>
                                                        <Radio value={'address 1'}>{`12345 Grand Boulevard
                                                                                    Suite 5678, Building C
                                                                                    City Center Complex
                                                                                    Metropolis City
                                                                                    State of Prosperity
                                                                                    Country of Success
                                                                                    Postal Code: 67890`}</Radio>
                                                        <Radio value={'address 2'}>{`12345 Grand Boulevard
                                                                                    Suite 5678, Building C
                                                                                    City Center Complex
                                                                                    Metropolis City
                                                                                    State of Prosperity
                                                                                    Country of Success
                                                                                    Postal Code: 67890`}</Radio>
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                            <div className="ps-form__submit">

                                                <a href="/shopping-cart">
                                                    <i className="icon-arrow-left mr-2"></i>
                                                    Return to shopping cart
                                                </a>

                                                <div className="ps-block__footer">
                                                    <button className="ps-btn" onClick={submit}>Continue to shipping</button>
                                                </div>
                                            </div>
                                        </>}

                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your order</h3>
                                        <ModulePaymentOrderSummary />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
