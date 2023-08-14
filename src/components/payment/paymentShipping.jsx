import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModulePaymentShipping = ({ addressFn, deliveryCharge }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const address_data = localStorage.getItem('delivary_address') ? JSON.parse(localStorage.getItem('delivary_address')) : null;
    const Router = useNavigate();
    useEffect(() => {
        addressFn(address_data);
    }, []);
    // Access query parameters
    const stock_id = queryParams.get('id');

    return (
        <>
            <div className="ps-block__panel">
                <figure>
                    {/* <small>Contact</small>
                    <p>test@gmail.com</p>

                    <a onClick={stock_id ? `/checkout/?id=${stock_id}` : "/checkout"}>Change</a> */}

                </figure>
                <figure>
                    <small>Ship to</small>
                    <p>{address_data ?
                        address_data.house_flat_number + ", " + address_data.delivery_name + ", " + address_data.area + ", " + address_data.city + ", " + address_data.state + ", " + address_data.pincode : '--'}</p>

                    <a style={{ cursor: "pointer" }} onClick={() => stock_id ? Router(`/checkout/?id=${stock_id}`) : Router("/checkout")}>Change</a>

                </figure>
            </div>
            <h4>Delivery charge</h4>
            <div className="ps-block__panel">
                <figure>
                    <small>Total Delivery chanrge</small>
                    <strong>₹{deliveryCharge?.total_delivery_charge}</strong>
                </figure>
            </div>
        </>
    );
};

export default ModulePaymentShipping;
