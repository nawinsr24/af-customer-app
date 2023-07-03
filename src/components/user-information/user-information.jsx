import React, { Component, useState } from 'react';

import FormChangeUserInformation from './formchangesUserInformation';
import { customAlert, notify } from '../notify';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCustomerService } from '../../services/customer-service';
import QueryKey from '../../QueryKey';
import UserInfo from './userInfoView';
import UserInfoView from './userInfoView';
import { AccountCircle } from '@mui/icons-material';

const UserInformation = () => {
    const { ctxtlogout, ctxtUser } = useAuthContext();
    const navigate = useNavigate();
    const { isLoading, isError, error, data: custData } = useQuery([QueryKey.getAllBanners], () => getCustomerService({ userId: ctxtUser?.userId }));
    const [isEdit, setIsEdit] = useState(false)
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Your Orders',
            url: '/orders',
            icon: 'icon-store',
        },
        {
            text: 'Order History',
            url: '/order-history',
            icon: 'icon-history',
        }
    ];

    function updateIsEdit(b) {
        setIsEdit(b);
    }

    async function handleLogout(e) {
        e.preventDefault();
        ctxtlogout();
        notify("success", "Logged out successfully");
        navigate("/", { replace: true });
    }


    if (isError) {
        customAlert(error);
        // return <h2>Something went wrong</h2>
    }
    return (
        <section className="ps-my-account ps-page--account" style={{ paddingTop: "0px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/1.png" />

                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>{custData?.name}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <a href={link.url}>
                                                    <i
                                                        className={
                                                            link.icon
                                                        }></i>
                                                    {link.text}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <a href="/" onClick={(e) => handleLogout(e)}>
                                                <i className="icon-power-switch"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            {!isEdit && <UserInfoView custData={custData} updateIsEdit={updateIsEdit} />}
                            {isEdit && <FormChangeUserInformation custData={custData} userId={ctxtUser?.userId} updateIsEdit={updateIsEdit}/>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
