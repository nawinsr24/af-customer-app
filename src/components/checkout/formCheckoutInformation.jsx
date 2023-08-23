import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { addAddress } from '../../services/checkout-service';
import { notify } from '../notify';
import { useAuthContext } from '../../context/AuthContext';
const FormCheckoutInformation = ({ onValueChange }) => {
    const { ctxtUser } = useAuthContext();
    const [temp, setTemp] = useState(false);
    const handleFormSubmit = async (data) => {
        data.user_id = ctxtUser?.userId;
        try {
            await addAddress(data);
            notify("success", "Address Added !");
            setTemp(!temp);
            onValueChange(temp);
        } catch (error) {
            notify("error", "Failed to Add Address !");
        }

    };

    return (
        <Form
            className="ps-form__billing-info"
            onFinish={handleFormSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="delivery_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="delivery_mobile_1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your contact number!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Contact Number"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your Email !',

                                },
                                {
                                    pattern: '[A-Za-z0-9._%-]+@[A-Za-z0-9_-]+\\.[a-z]{2,4}',
                                    message: 'Please enter valid email !'
                                }
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Email"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    {/* <div className="form-group">
                        <Form.Item
                            name="delivery_mobile_1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your contact number!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Contact Number"
                            />
                        </Form.Item>
                    </div> */}
                </div>
            </div>
            {/* <div className="form-group">
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: false,
                            message:
                                'Enter an email or mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Email or phone number"
                    />
                </Form.Item>
            </div> */}
            {/* <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="keep-update"
                        />
                        <label htmlFor="keep-update">
                            Keep me up to date on news and exclusive offers?
                        </label>
                    </div>
                </div> */}
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="house_flat_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your house/flat number!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="House/Flat Number"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="area"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your area!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Area"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            {/* <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                    />
                </Form.Item>
            </div> */}
            {/* <div className="form-group">
                <Form.Item
                    name="apartment"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an Apartment!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </Form.Item>
            </div> */}
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your state!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="State"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="Pincode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a pincode!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Pincode"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="delivery_mobile_2"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter Emergency Contact Number!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Emergency Contact Number (optional)"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="address_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter address type!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="address type"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                </div>
            </div>
            {/* <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div> */}
            <div className="row" style={{ paddingLeft: "10px", gap: "10px" }}>
                <div className="ps-form__submit">

                    {/* <a href="/shopping-cart">
    <i className="icon-arrow-left mr-2"></i>
    Return to shopping cart
</a> */}

                    <div className="ps-block__footer">
                        <button className="ps-btn">Add</button>
                    </div>
                </div>

                <button className="ps-btn ps-btn--black" style={{ color: "white" }}
                    onClick={() => {
                        setTemp(!temp);
                        onValueChange(temp);
                    }}>Back</button>
            </div>

        </Form>
    );
};
// }

export default FormCheckoutInformation;
