import React from 'react';
import { Form, Input } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';
import { useNavigate } from 'react-router-dom';


function OtpPage() {
    const Router = useNavigate();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'OTP',
        },
    ];

    async function handleSubmit(values) {
        Router('/auth/login');
    }
    return (
        <>
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-my-account" style={{ minHeight: '90vh' }}>
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={handleSubmit}>
                        {/* <ul className="ps-tab-list">
                            <li>
                                <a>
                                    OTP
                                </a>
                            </li>

                        </ul> */}
                        <div className="ps-tab active" id="otp">
                            <div className="ps-form__content">
                                <h5>Enter OTP</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="otp"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your otp!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Otp"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Verify
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                {/* <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a className="facebook" href="/#">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="google" href="/#">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" href="/#">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="instagram" href="/#">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul> */}
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default OtpPage;