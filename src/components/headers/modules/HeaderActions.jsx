import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import Link from 'next/link';
import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { useAuthContext } from '../../../context/AuthContext';
// import { getCart } from '../../../services/home-page-service';

const HeaderActions = ({ ecomerce, auth }) => {
    const { ctxtUser } = useAuthContext();
    // const [cartData, setCartData] = useState([]);
    // useEffect(() => {
    //     const getData = async () => {
    //         const cartResponse = await getCart(ctxtUser?.userId);
    //         cartResponse.forEach((pro) => {
    //             if (pro.discount_percentage) {
    //                 const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
    //                 const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
    //                 pro.original_base_price = pro.base_price;
    //                 pro.base_price = final_price;
    //             }
    //         });
    //         setCartData(cartResponse);
    //     };
    //     getData();
    // }, []);

    // views
    let headerAuthView;
    if (ctxtUser?.token) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }


    return (
        <div className="header__actions">
            <MiniCart />
            {headerAuthView}

        </div>
    );
};

export default HeaderActions;
