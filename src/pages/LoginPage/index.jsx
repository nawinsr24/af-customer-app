import React, { Component, useState } from 'react';
import { Form, Input, notification } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';
import FooterFullwidth from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
import { CircularProgress } from '@mui/material';
import { customAlert, notify } from '../../components/notify';
import { loginService } from '../../services/login-service';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isSubmitClick, setIsSubmitClick] = useState(false);
    const { ctxtlogin, ctxtUser } = useAuthContext();
    const navigate = useNavigate();
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
        setIsSubmitClick(true);
        try {
            const res = await loginService({ ...values });
            ctxtlogin(res);
            notify("success", "Login successfully");

            navigate("/", { replace: true });

        } catch (err) {
            console.log("1111111111111")
            console.log(err);
            console.log("222222222")
            if (err === 401)
                notify("error", "Invalid Username / Password");
            else
                customAlert(err);

        }
        setIsSubmitClick(false);
    }

    useEffect(() => {
        if (ctxtUser?.token)
            navigate("/", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (<>
        <PageContainer footer={<FooterFullwidth />} title="Login">
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-my-account" style={{ marginBottom: "10px" }}>
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
                        <div className="ps-tab active" id="sign-in" style={{ paddingBottom: "10px" }}>
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <label htmlFor="username" style={{ marginBottom: 0 }}>Mobile Number or Email address:</label>
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
                                            placeholder="Mobile Number or Email address"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <label htmlFor="username" style={{ marginBottom: 0 }}>Password:</label>
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
                                <div className="form-group submit" >
                                    <button
                                        disabled={isSubmitClick}
                                        className="ps-btn ps-btn--fullwidth"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            opacity: isSubmitClick ? 0.5 : 1
                                        }}>
                                        {isSubmitClick && <CircularProgress color='inherit' size={20} sx={{ mr: 1 }} />}
                                        Login
                                    </button>
                                </div>
                            </div>
                            {/* <div className="ps-form__footer"> */}
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
                            {/* </div> */}
                        </div>
                    </Form>
                </div>
            </div>
        </PageContainer>
    </>

    )
}

export default Login