import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import 'moment-timezone';
import AccountMenuSidebar from './accountMenu';
import LazyLoad from 'react-lazyload';
import { getOrder } from '../../services/checkout-service';
import { useAuthContext } from '../../context/AuthContext';
import Constants from '../../constants';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const Router = useNavigate();
    const { ctxtUser } = useAuthContext();
    const getData = async () => {
        const customer_id = ctxtUser?.userId;
        const res = await getOrder({ customer_id });
        setOrders(res);
    };


    const navigate = (product_data) => {
        const encrypt = btoa(JSON.stringify(product_data));
        Router(`/order-tracking/?data=${encrypt}`);
    };

    useEffect(() => {
        ctxtUser?.userId ? getData() : Router('/');
    }, []);

    const calculateArrivalDate = (delivery_date) => {
        let message = '';
        if (!!delivery_date) {
            const deliveryDate = delivery_date;
            const format = "YYYY-MM-DD";
            const parsedDeliveryDate = Moment(deliveryDate, format);
            const currentDate = Moment();
            const tomorrowDate = Moment().add(1, 'days');
            if (parsedDeliveryDate.isSame(currentDate, 'date')) {
                message = 'today';
            } else if (parsedDeliveryDate.isSame(tomorrowDate, 'date')) {
                message = 'tomorrow';
            } else {
                message = `on ${parsedDeliveryDate.format("Do MMMM")}`;
            }
        }
        return message;

    };


    const accountLinks = [
        {
            text: 'Account Information',
            url: '/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Your Orders',
            url: '/orders',
            icon: 'icon-store',
            active: true
        },
        // {
        //     text: 'Order History',
        //     url: '/order-history',
        //     icon: 'icon-history',
        // }
    ];
    return (
        <section style={{
            minHeight: '76vh', paddingTop: '10px'
        }
        } className="ps-my-account ps-page--account" >
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3 style={{ margin: "10px 0px" }}>

                                        <strong>Your Orders</strong>
                                    </h3>
                                </div>
                                <div className="ps-section__content">
                                    {/* <div className="row">
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Address
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <strong>
                                                            John Walker
                                                        </strong>
                                                        <p>
                                                            Address: 3481 Poe
                                                            Lane, Westphalia,
                                                            Kansas
                                                        </p>
                                                        <p>
                                                            Phone: 913-489-1853
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Shipping Fee
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Shipping Fee: Free
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Payment
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Payment Method: Visa
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                        </div> */}
                                    {
                                        orders.map(o => (
                                            <>
                                                <div>
                                                    <div><h3>Delivery address</h3></div>
                                                    <figure>
                                                        <figcaption>
                                                            {o.delivery_name + ' , ' + o.house_flat_no}
                                                            <br />
                                                            {o.area + ', ' + o.city + ', ' + o.state

                                                            }
                                                            <br />
                                                            {o.pincode}
                                                            <br />
                                                            contact : {o.delivery_mobile_1}
                                                            <br />
                                                            {/* Emergency contact : {o.delivery_mobile_2} */}
                                                            <div>
                                                                {
                                                                    o.order_status == 'delivered'
                                                                        ? <div>
                                                                            <h4 style={{ color: 'crimson', margin: '10px 0px', }}><strong>Delivered on {o.delivery_date}</strong></h4>
                                                                        </div>
                                                                        : <h4 style={{ color: 'green', margin: '10px 0px', }}><strong>Arriving {calculateArrivalDate(o.delivery_date)}</strong></h4>

                                                                }
                                                            </div>
                                                            {
                                                                o.order_status !== 'delivered'
                                                                    ? <div className='track-order'>
                                                                        <span style={{ color: '#fcb800', margin: '10px 0px', cursor: "pointer", fontSize: '2rem' }}>
                                                                            <a style={{ borderBottom: "2px solid #fcb800", fontWeight: 700 }} onClick={() => navigate(o)}>Track Order</a></span>
                                                                    </div>
                                                                    : ''
                                                            }

                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div className="table-responsive" style={{ marginTop: "10px" }}>
                                                    <table className="table ps-table--shopping-cart">
                                                        <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Price</th>
                                                                <th>GST(%)</th>
                                                                <th>Quantity</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {o?.order_stock?.map(
                                                                product => (
                                                                    <tr
                                                                        key={
                                                                            product.tracking_id
                                                                        }>
                                                                        <td>
                                                                            <div className="ps-product--cart">
                                                                                <div className="ps-product__thumbnail">


                                                                                    <a onClick={() => navigate(o)}>
                                                                                        <LazyLoad>
                                                                                            <img
                                                                                                src={product.images[0] && `${Constants.imgUrl}${product.images[0]}`}
                                                                                                alt={product.images[0] && `${Constants.imgUrl}${product.images[0]}`}
                                                                                            />
                                                                                        </LazyLoad>
                                                                                    </a>

                                                                                </div>
                                                                                <div className="ps-product__content">{
                                                                                    <a onClick={() => navigate(o)} className="ps-product__title">{product.name}</a>
                                                                                }</div>
                                                                            </div>

                                                                        </td>
                                                                        <td className="price">
                                                                            ₹
                                                                            {
                                                                                product.base_price || '--'
                                                                            }
                                                                        </td>
                                                                        <td>{product.gst_rate ? product.gst_rate + ' %' : '--'}</td>
                                                                        <td>{product.quantity || '--'}</td>
                                                                        <td className="price">
                                                                            ₹
                                                                            {
                                                                                product.total_price || '--'
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                            <tr >
                                                                <td style={{ fontWeight: 700, fontSize: "2rem", paddingRight: '4rem', textAlign: 'right' }} colSpan={5} >Total : ₹{o.total}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div style={{ borderTop: "1.5px solid #2196f3", margin: "3rem 0rem" }}></div>
                                            </>

                                        ))
                                    }

                                    {/* <a href="/invoices" className="ps-btn ps-btn--sm ">
                                            Back to invoices
                                        </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default OrderDetails;
