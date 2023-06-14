import React, { Component } from 'react';
import { Form, Input, notification } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';

function Login() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Login',
        },
    ];

    async function handleLoginSubmit(values) {

        console.log(values)
    }
    return (<>
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="ps-my-account">

            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={handleLoginSubmit}>
                    <ul className="ps-tab-list" style={{ marginBottom: "10px" }}>
                        <li className="active">
                            <a href="/login">
                                Login
                            </a>
                        </li>
                        <li>
                            <a href="/register">
                                Register
                            </a>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Username or email address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            {/* <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="/#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="/#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="twitter"
                                        href="/#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="/#"
                                        onClick={e =>
                                            this.handleFeatureWillUpdate(e)
                                        }>
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

    )
}

export default Login