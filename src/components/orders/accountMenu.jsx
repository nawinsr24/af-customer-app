import React, { useEffect, useState } from 'react';
import { notify } from '../notify';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCustomerService } from '../../services/customer-service';

const AccountMenuSidebar = ({ data }) => {
    const { ctxtlogout, ctxtUser } = useAuthContext();
    const navigate = useNavigate();
    const [UserData, setUserData] = useState(null);

    const getData = async () => {
        const userRes = await getCustomerService({ userId: ctxtUser?.userId });
        setUserData(userRes);
    };

    useEffect(() => {
        getData();
    }, []);


    async function handleLogout(e) {
        e.preventDefault();
        ctxtlogout();
        notify("success", "Logged out successfully");
        navigate("/", { replace: true });
    }
    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header">
                <img src="/static/img/users/1.png" />
                <figure>
                    <figcaption>Hello</figcaption>
                    <p>{UserData?.name}</p>
                </figure>
            </div>
            <div className="ps-widget__content">
                <ul>
                    {data.map(link => (
                        <li key={link.text} className={link.active ? 'active' : ''}>
                            <a onClick={() => navigate(`${link.url}`)}>
                                <i className={link.icon}></i>
                                {link.text}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="/" onClick={(e) => handleLogout(e)}>
                            <i className="icon-power-switch"></i>
                            Logout</a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default AccountMenuSidebar;
