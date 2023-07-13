import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { notify } from '../../notify';
import { useNavigate } from 'react-router-dom';
// import { logOut } from '~/store/auth/action';

const AccountQuickLinks = (props) => {
    // const dispatch = useDispatch();
    const { ctxtlogout } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        ctxtlogout();
        notify("success", "Logged out successfully");
        navigate("/", { replace: true });
        window.location.reload();
        // dispatch(logOut());
    };
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/user-information',
        },
        {
            text: 'Your Orders',
            url: '/orders',
        },
        {
            text: 'Order History',
            url: '/order-history',
        }
        // {
        //     text: 'Address',
        //     url: '/addresses',
        // },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        // },

    ];
    const { isLoggedIn } = props;

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>

            <a href={item.url}>
                {item.text}
            </a>

        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="/" onClick={(e) => handleLogout(e)}>

                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">

                    <a href='/auth/login'>
                        Login
                    </a>


                    <a href='/auth/register'>
                        Register
                    </a>

                </div>
            </div>
        );
    }
};

export default AccountQuickLinks;
