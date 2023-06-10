import React from 'react'
import './index.css';
import imgLoginPgBg1 from '../../assets/svg/loginPageBg_1.svg';
import imgLoginPgBg2 from '../../assets/svg/loginPageBg_2.svg';
import imgLoginPgBg3 from '../../assets/svg/loginPageBg_3.svg';
import imgLoginPgTrk from '../../assets/svg/loginPageTruck.svg';
import logo from "../../assets/svg/logo.svg";
import { Stack, Button, Typography } from "@mui/material"
import { useState } from 'react';
import PwdTxtField from '../../components/PwdTxtField';
import LabelTxtField from '../../components/LabelTxtField';
import validateLogin from '../../components/validateLogin';
import { customAlert, notify } from '../../components/notify';
import { loginService } from '../../services/login-service';
import { useAuthContext } from '../../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import route from '../../Routes';


function LoginPage() {
    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();

    const { ctxtlogin, ctxtUser } = useAuthContext();
    const navigate = useNavigate();

    const cancelCourse = () => {
        document.getElementById("formId").reset();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object

        let errorsObj = validateLogin(inputObject);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);

        try {
            const res = await loginService(inputObject);
            ctxtlogin(res);
            notify("success", "Login successfully");
            if (res?.token && res?.type === 'sa')
                navigate(route.saBoLists, { replace: true });
            else if (res?.token && res?.type === 'staff')
                navigate(route.boDashboard, { replace: true });
            setLoadingScreen(false);
            cancelCourse();
        } catch (err) {
            console.log(err);
            if (err === 401)
                notify("error", "Invalid Username / Password");
            else if (err === 409)
                notify("error", "Staff disabled Contact backoffice to reactivate");
            else if (err === 410)
                notify("error", "Backoffice disabled Contact admin to reactivate");
            else
                customAlert(err);

        }
        setLoadingScreen(false);
    };


    useEffect(() => {
        console.log("call use effect ---------------------");
        setLoadingScreen(true);
        console.log(ctxtUser?.token);
        if (ctxtUser?.token && ctxtUser?.type === 'sa')
            navigate(route.saBoLists, { replace: true });
        else if (ctxtUser?.token && ctxtUser?.type === 'staff')
            navigate(route.boDashboard, { replace: true });

        setLoadingScreen(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <div className='bg'>
            <img src={imgLoginPgBg1} alt="loginPageBg_1" className='bg-img-1' />
            <img src={imgLoginPgBg2} alt="loginPageBg_2" className='bg-img-2' />
            <img src={imgLoginPgBg3} alt="loginPageBg_3" className='bg-img-3' />
            <img src={imgLoginPgTrk} alt="imgLoginPgTrk" className='imgLoginPgTrk' />
            <img src={logo} alt="logo" className='logo' />

            <form onSubmit={handleSubmit} noValidate id='formId'>
                <Typography sx={{ mb: 0.8, fontWeight: "700", fontSize: 23 }}>Welcome</Typography>
                <Typography className='subTxt' sx={{ mb: 4, fontWeight: "500" }}>You are one Step away from Login</Typography>
                <Stack gap={"1.5rem"} className='input-grp'>
                    <LabelTxtField type='email' name='email'
                        placeholder="Enter your Registered Email Address" title="Email Address" errMsg={formErrors.email} />

                    <PwdTxtField errMsg={formErrors.password} />

                    <Button variant="contained" type='submit' style={{ marginTop: "1rem", height: "3rem" }}>Login</Button>

                </Stack>
            </form>


        </div >
    </>
    )
}

export default LoginPage;