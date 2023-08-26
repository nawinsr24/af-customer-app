import React, { useState } from 'react';
import { Radio, Form } from 'antd';

import { useNavigate } from 'react-router-dom';
import { getAirpay, postOrder } from '../../services/checkout-service';

const ModulePaymentMethods = ({ address, checkoutProducts, deliveryCharge }) => {
    const [method, setMethod] = useState('');
    const Router = useNavigate();
    function handleChangeMethod(e) {
        setMethod(e.target.value); //e.target.value
    }

    async function handleSubmit(e) {
        let gst_total = 0;
        let total_discount = 0;
        let total = 0;
        let base_total = 0;
        checkoutProducts.forEach((product) => {
            total += parseFloat(product.base_price * (product.cart_quantity || 1));
            gst_total += parseFloat(product.gst_rate);
            base_total += parseFloat(product.original_base_price * (product.cart_quantity || 1));
            total_discount += parseFloat(product.discount_percentage || 0);
        });
        const reqObj = {
            ...address,
            gst_total,
            total_discount,
            base_total,
            gross_total: Math.round(total + (!!!deliveryCharge?.is_free_delivery ? parseFloat(deliveryCharge?.total_delivery_charge) : 0)),
            total,
            checkout_products: checkoutProducts,
            payment_type: method,
            delivery_charge: !!!deliveryCharge?.is_free_delivery ? deliveryCharge?.total_delivery_charge : 0

        };
        console.log(reqObj);
        try {

            const payNowRes = await postOrder(reqObj);
            method == 'cod'
                ? Router('/order-success')
                : await getAirpay(payNowRes);
        } catch (error) {

        }
    }

    return (
        <>
            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method" >

                <div>
                    <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                        className="ps-form__billing-info"
                        onFinish={handleSubmit}>
                        <Form.Item
                            name="payment_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Select payment type!',
                                },
                            ]}>

                            <Radio.Group
                                onChange={(e) => handleChangeMethod(e)}
                                value={method}>
                                <Radio value={'cod'}>Cash on delivery</Radio>
                                <Radio value={'online'}>Online</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <div style={
                            { marginTop: '15px' }
                        } className="ps-form__submit">

                            <div className="ps-block__footer">
                                <button className="ps-btn">
                                    Pay now

                                </button>
                            </div>

                        </div>
                    </Form>

                </div>
                <div className="ps-block__content">
                    {/* {method === 1 ? (
                        <div className="ps-block__tab">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Card Holders</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>Expiration Date (MM/YY)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="01/21"
                                        />
                                    </div>
                                </div>
                                <div className=" col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="ps-block__tab">
                            <button
                                className="ps-btn"
                                onClick={(e) => handleSubmit(e)}>
                                Pay now

                            </button>
                        </div>
                    )} */}

                </div>
            </div>
        </>
    );
};

export default ModulePaymentMethods;
