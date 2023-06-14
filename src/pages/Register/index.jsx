import React from 'react'
import { Form, Input } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';


function Register() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register',
        },
    ];

    async function handleSubmit(values) {

        console.log(values)
    }
    return (
        <>
         <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <a href="/login">
                                    Login
                                </a>
                            </li>
                            <li className="active">
                                <a href="/register">
                                    Register
                                </a>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"
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
                                        Register
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
    )
}

export default Register