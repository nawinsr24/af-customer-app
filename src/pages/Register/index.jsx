import React from 'react'
import { Form, Input } from 'antd';
import BreadCrumb from '../../components/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import FooterFullwidth from '../../components/footers/FooterFullwidth';
import PageContainer from '../../components/layouts/PageContainer';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { customAlert, notify } from '../../components/notify';
import { signupService, verifyCustOtpService } from '../../services/signup-service';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';


function Register() {
    const navigate = useNavigate();
    const [isVrfyClick, setIsVrfyClick] = useState(false);
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [isSubmitClick, setIsSubmitClick] = useState(false);
    const { ctxtUser } = useAuthContext()
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register',
        },
    ];

    useEffect(() => {
        if (ctxtUser?.token)
            navigate("/", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleVerify(values) {
        setIsVrfyClick(true);
        try {
            await signupService({ username: values.username });
            notify("success", "OTP Sent to your Email/Mobile");
            setIsOtpSend(true);
        } catch (err) {
            console.log(err);
            if (err === 409)
                notify("error", "Email/Mobile Already Exist");
            else
                customAlert(err);
        }
        setIsVrfyClick(false)
    }

    async function handleSubmit(values) {
        console.log(values)
        setIsSubmitClick(true);
        try {
            delete values.confirmPassword;
            await verifyCustOtpService({ ...values });
            notify("success", "Registered Successfully");
            setIsOtpSend(true);
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
            if (err === 409)
                notify("error", "Invalid OTP");
            else if (err === 410)
                notify("error", "OTP Expired");
            else
                customAlert(err);
        }
        setIsSubmitClick(false)
    }
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Register">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="ps-my-account" style={{ marginBottom: "10px" }}>
                    <div className="container">
                        <Form

                            className="ps-form--account"
                            onFinish={isOtpSend ? handleSubmit : handleVerify}>
                            <ul className="ps-tab-list" style={{ marginBottom: "10px" }}>
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
                            <div className="ps-tab active" id="register" style={{ paddingBottom: "10px" }}>
                                <div className="ps-form__content" >
                                    <h5>Register An Account</h5>
                                    <div className="form-group" >
                                        <label htmlFor="username" style={{ marginBottom: 0 }}>Mobile Number or Email address:</label>
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your email or mobile !',
                                                },
                                            ]}
                                            style={{

                                                opacity: isOtpSend ? 0.5 : 1
                                            }}>
                                            <Input
                                                disabled={isOtpSend}
                                                className="form-control"
                                                type="text"
                                                placeholder="Mobile Number or Email address"
                                            />
                                        </Form.Item>
                                    </div>

                                    {!isOtpSend && <div className="form-group submit" >
                                        <button
                                            type="submit"
                                            disabled={isVrfyClick}
                                            className="ps-btn ps-btn--fullwidth"
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                opacity: isVrfyClick ? 0.5 : 1
                                            }}>
                                            {isVrfyClick && <CircularProgress color='inherit' size={20} sx={{ mr: 1 }} />}
                                            Verify
                                        </button>
                                    </div>}
                                    {isOtpSend && <div>
                                        <div className="form-group">
                                            <label htmlFor="otp" style={{ marginBottom: 0 }}>OTP:</label>
                                            <Form.Item
                                                name="otp"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input the OTP!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="OTP"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="custName" style={{ marginBottom: 0 }}>Name:</label>
                                            <Form.Item
                                                name="custName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your name!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Name"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" style={{ marginBottom: 0 }}>Confirm Password:</label>
                                            <Form.Item
                                                name="confirmPassword"
                                                dependencies={['password']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="Confirm Password"
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
                                                Submit
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </Form>
                    </div>

                </div>
            </PageContainer>
        </>
    )
}

export default Register;