import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import FormCheckoutInformation from '../../components/checkout/formCheckoutInformation';
import { Form, Input } from 'antd';
import ModulePaymentOrderSummary from '../../components/checkout/paymentOrderSummary';
import { useAuthContext } from '../../context/AuthContext';
import { getAddress, postOrder } from '../../services/checkout-service';
import { useLocation } from 'react-router-dom';
import { notify } from '../notify';
import { getProductData } from '../../services/product-service';
import { getCart } from '../../services/home-page-service';

const Checkout = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access query parameters
    const stock_id = queryParams.get('id');
    const { ctxtUser } = useAuthContext();
    const Router = useNavigate();
    const [is_add_adrress, isAddAddress] = useState(false);
    const [checkoutAddress, setCheckoutAddress] = useState('');
    const [addressList, setaddressList] = useState([]);
    const [checkoutProducts, setcheckoutProducts] = useState([]);
    const getAddressData = async () => {
        const addressRes = await getAddress(ctxtUser.userId);
        setaddressList(addressRes);
    }
    async function getSingleProduct() {
        const productRes = await getProductData(stock_id);
        setcheckoutProducts(productRes);
    }
    async function getCartProducts() {
        const productRes = await getCart(ctxtUser.userId);
        setcheckoutProducts(productRes);

    }
    useEffect(() => {
        getAddressData();
        if (stock_id) {
            getSingleProduct();
        } else {
            getCartProducts();
        }
    }, [is_add_adrress]);
    const handleAddressChange = (e) => {
        console.log(e.target.value);
        setCheckoutAddress(e.target.value);
    }

    function isAddAddressFn(showAddressList) {
        isAddAddress(showAddressList)
    }

    const submit = async () => {
        const reqObj = {
            ...checkoutAddress,
            checkout_products: checkoutProducts
        }
        await postOrder(reqObj);
        console.log(reqObj);
        // Router('/shipping')
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
                                            {
                                                addressList?.length
                                                    ? <><div style={{ padding: '30px 20px', borderRadius: '4px', backgroundColor: '#fff', border: '2px solid #eaeaea', marginBottom: '10px', marginTop: '22px' }}>
                                                        <div>
                                                            <Form
                                                                className="ps-form__billing-info"
                                                                onFinish={submit}>
                                                                <Form.Item
                                                                    name="address"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Select shipping address!',
                                                                        },
                                                                    ]}>
                                                                    <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                                                                        onChange={(e) => handleAddressChange(e)}
                                                                        value={checkoutAddress}>
                                                                        {addressList.map((a) => {
                                                                            return (
                                                                                <Radio value={a} style={{ width: "100%", padding: '10px', background: 'rgb(245 245 245)', borderRadius: "10px" }}>
                                                                                    <figure>
                                                                                        <figcaption>
                                                                                            {a.delivery_name + ' , ' + a.house_flat_number}
                                                                                            <br />
                                                                                            {a.area + ', ' + a.city + ', ' + a.state

                                                                                            }
                                                                                            <br />
                                                                                            {a.pincode}
                                                                                            <br />
                                                                                            contact : {a.delivery_mobile_1}
                                                                                            <br />
                                                                                            Emergency contact : {a.delivery_mobile_2}
                                                                                        </figcaption>
                                                                                    </figure> </Radio>
                                                                            )
                                                                        })}
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                                <div className="ps-form__submit">

                                                                    <a href="/shopping-cart">
                                                                        <i className="icon-arrow-left mr-2"></i>
                                                                        Return to shopping cart
                                                                    </a>

                                                                    <div className="ps-block__footer">
                                                                        <button className="ps-btn">Continue to shipping</button>
                                                                    </div>
                                                                </div>
                                                            </Form>

                                                        </div>
                                                    </div>
                                                    </>
                                                    : <figure style={{ border: '1.5px solid #eaeaea', margin: '3rem 0rem', padding: '10px', fontWeight: "bold", color: "red" }}>
                                                        <figcaption>
                                                            {`To proceed to the next step, please provide the address !`}
                                                        </figcaption>
                                                    </figure>
                                            }

                                        </>}

                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your order</h3>
                                        <ModulePaymentOrderSummary products={checkoutProducts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Checkout;
